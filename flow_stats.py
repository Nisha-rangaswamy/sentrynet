from os_ken.base import app_manager
from os_ken.controller import ofp_event
from os_ken.controller.handler import (
    CONFIG_DISPATCHER,
    MAIN_DISPATCHER,
    DEAD_DISPATCHER,
    set_ev_cls
)
from os_ken.ofproto import ofproto_v1_3
from os_ken.lib import hub

from os_ken.lib.packet import packet
from os_ken.lib.packet import ethernet
from os_ken.lib.packet import ether_types
from os_ken.lib.packet import ipv4

import csv
import os
import time


class FlowStats(app_manager.OSKenApp):

    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    def __init__(self, *args, **kwargs):
        super(FlowStats, self).__init__(*args, **kwargs)

        # Connected switches
        self.datapaths = {}

        # MAC address -> switch port
        self.mac_to_port = {}

        # Store IP information for flows
        self.flow_ips = {}

        # Dataset file
        self.csv_file = "dataset.csv"

        # Create CSV file with header
        if not os.path.exists(self.csv_file):

            with open(
                self.csv_file,
                "w",
                newline=""
            ) as f:

                writer = csv.writer(f)

                writer.writerow([
                    "timestamp",
                    "switch",
                    "source_ip",
                    "destination_ip",
                    "input_port",
                    "output_port",
                    "packet_count",
                    "byte_count",
                    "duration",
                    "label"
                ])

        # Start statistics monitoring
        self.monitor_thread = hub.spawn(
            self._monitor
        )

    # =========================================================
    # SWITCH FEATURES
    # =========================================================

    @set_ev_cls(
        ofp_event.EventOFPSwitchFeatures,
        CONFIG_DISPATCHER
    )
    def switch_features_handler(self, ev):

        datapath = ev.msg.datapath

        ofproto = datapath.ofproto
        parser = datapath.ofproto_parser

        # Table-miss rule
        match = parser.OFPMatch()

        actions = [
            parser.OFPActionOutput(
                ofproto.OFPP_CONTROLLER,
                ofproto.OFPCML_NO_BUFFER
            )
        ]

        self.add_flow(
            datapath,
            0,
            match,
            actions
        )

        self.logger.info(
            "Table-miss flow installed on switch %016x",
            datapath.id
        )

    # =========================================================
    # ADD FLOW
    # =========================================================

    def add_flow(
        self,
        datapath,
        priority,
        match,
        actions
    ):

        ofproto = datapath.ofproto
        parser = datapath.ofproto_parser

        instructions = [
            parser.OFPInstructionActions(
                ofproto.OFPIT_APPLY_ACTIONS,
                actions
            )
        ]

        mod = parser.OFPFlowMod(
            datapath=datapath,
            priority=priority,
            match=match,
            instructions=instructions
        )

        datapath.send_msg(mod)

    # =========================================================
    # PACKET IN
    # =========================================================

    @set_ev_cls(
        ofp_event.EventOFPPacketIn,
        MAIN_DISPATCHER
    )
    def packet_in_handler(self, ev):

        msg = ev.msg

        datapath = msg.datapath

        ofproto = datapath.ofproto
        parser = datapath.ofproto_parser

        in_port = msg.match["in_port"]

        # Parse packet
        pkt = packet.Packet(msg.data)

        eth = pkt.get_protocol(
            ethernet.ethernet
        )

        if eth is None:
            return

        # Ignore LLDP
        if eth.ethertype == ether_types.ETH_TYPE_LLDP:
            return

        src = eth.src
        dst = eth.dst

        dpid = datapath.id

        # Create MAC table
        if dpid not in self.mac_to_port:

            self.mac_to_port[dpid] = {}

        # Learn source MAC
        self.mac_to_port[dpid][src] = in_port

        # -----------------------------------------------------
        # Extract IPv4 addresses
        # -----------------------------------------------------

        ip_header = pkt.get_protocol(
            ipv4.ipv4
        )

        if ip_header is not None:

            src_ip = ip_header.src
            dst_ip = ip_header.dst

            self.flow_ips[
                (dpid, in_port, src, dst)
            ] = (
                src_ip,
                dst_ip
            )

        # -----------------------------------------------------
        # Find output port
        # -----------------------------------------------------

        if dst in self.mac_to_port[dpid]:

            out_port = self.mac_to_port[dpid][dst]

        else:

            out_port = ofproto.OFPP_FLOOD

        # -----------------------------------------------------
        # Install flow
        # -----------------------------------------------------

        if out_port != ofproto.OFPP_FLOOD:

            match = parser.OFPMatch(
                in_port=in_port,
                eth_src=src,
                eth_dst=dst
            )

            actions = [
                parser.OFPActionOutput(
                    out_port
                )
            ]

            self.add_flow(
                datapath,
                1,
                match,
                actions
            )

        # -----------------------------------------------------
        # Forward packet
        # -----------------------------------------------------

        actions = [
            parser.OFPActionOutput(
                out_port
            )
        ]

        data = None

        if msg.buffer_id == ofproto.OFP_NO_BUFFER:

            data = msg.data

        out = parser.OFPPacketOut(
            datapath=datapath,
            buffer_id=msg.buffer_id,
            in_port=in_port,
            actions=actions,
            data=data
        )

        datapath.send_msg(out)

    # =========================================================
    # SWITCH STATE
    # =========================================================

    @set_ev_cls(
        ofp_event.EventOFPStateChange,
        [MAIN_DISPATCHER, DEAD_DISPATCHER]
    )
    def state_change_handler(self, ev):

        datapath = ev.datapath

        if ev.state == MAIN_DISPATCHER:

            if datapath.id not in self.datapaths:

                self.logger.info(
                    "Switch %016x connected",
                    datapath.id
                )

                self.datapaths[
                    datapath.id
                ] = datapath

        elif ev.state == DEAD_DISPATCHER:

            if datapath.id in self.datapaths:

                self.logger.info(
                    "Switch %016x disconnected",
                    datapath.id
                )

                del self.datapaths[
                    datapath.id
                ]

    # =========================================================
    # MONITOR
    # =========================================================

    def _monitor(self):

        while True:

            for datapath in self.datapaths.values():

                self._request_stats(
                    datapath
                )

            # Collect every 5 seconds
            hub.sleep(5)

    # =========================================================
    # REQUEST STATISTICS
    # =========================================================

    def _request_stats(self, datapath):

        parser = datapath.ofproto_parser

        req = parser.OFPFlowStatsRequest(
            datapath
        )

        datapath.send_msg(req)

    # =========================================================
    # FLOW STATISTICS RESPONSE
    # =========================================================

    @set_ev_cls(
        ofp_event.EventOFPFlowStatsReply,
        MAIN_DISPATCHER
    )
    def flow_stats_reply_handler(self, ev):

        datapath = ev.msg.datapath

        body = ev.msg.body

        print()
        print(
            "================================================"
        )
        print(
            "              FLOW STATISTICS"
        )
        print(
            "================================================"
        )

        for stat in body:

            # Ignore table-miss
            if stat.priority == 0:
                continue

            match = stat.match

            # -------------------------------------------------
            # Ports
            # -------------------------------------------------

            in_port = match.get(
                "in_port",
                "N/A"
            )

            out_port = "N/A"

            if stat.instructions:

                for instruction in stat.instructions:

                    if hasattr(
                        instruction,
                        "actions"
                    ):

                        for action in instruction.actions:

                            if hasattr(
                                action,
                                "port"
                            ):

                                out_port = action.port

                                break

            # -------------------------------------------------
            # IP addresses
            # -------------------------------------------------

            src_ip = match.get(
                "ipv4_src",
                "N/A"
            )

            dst_ip = match.get(
                "ipv4_dst",
                "N/A"
            )

            # If IP is not in the flow match,
            # try to retrieve it from learned packet data.

            if src_ip == "N/A" or dst_ip == "N/A":

                for key, value in self.flow_ips.items():

                    flow_dpid = key[0]
                    flow_in_port = key[1]

                    if (
                        flow_dpid == datapath.id
                        and flow_in_port == in_port
                    ):

                        src_ip = value[0]
                        dst_ip = value[1]

                        break

            # -------------------------------------------------
            # Statistics
            # -------------------------------------------------

            packet_count = stat.packet_count

            byte_count = stat.byte_count

            duration = stat.duration_sec

            timestamp = time.strftime(
                "%Y-%m-%d %H:%M:%S"
            )

            # -------------------------------------------------
            # Label
            # -------------------------------------------------

            label = "normal"

            # -------------------------------------------------
            # Print
            # -------------------------------------------------

            print(
                "-----------------------------------------------"
            )

            print(
                "Switch          :",
                datapath.id
            )

            print(
                "Source IP       :",
                src_ip
            )

            print(
                "Destination IP  :",
                dst_ip
            )

            print(
                "Input Port      :",
                in_port
            )

            print(
                "Output Port     :",
                out_port
            )

            print(
                "Packet Count    :",
                packet_count
            )

            print(
                "Byte Count      :",
                byte_count
            )

            print(
                "Duration        :",
                duration,
                "seconds"
            )

            print(
                "Label           :",
                label
            )

            print(
                "-----------------------------------------------"
            )

            # -------------------------------------------------
            # Save to dataset.csv
            # -------------------------------------------------

            with open(
                self.csv_file,
                "a",
                newline=""
            ) as f:

                writer = csv.writer(f)

                writer.writerow([
                    timestamp,
                    datapath.id,
                    src_ip,
                    dst_ip,
                    in_port,
                    out_port,
                    packet_count,
                    byte_count,
                    duration,
                    label
                ])
