#!/bin/bash

OUTPUT_FILE="traffic_capture.pcap"

s
echo "========================================="
echo "Starting Traffic Capture"
echo "========================================="

echo "Capturing packets on interface s1-eth1..."
sudo tcpdump -i s1-eth1 -w $OUTPUT_FILE"

echo "Capture saved as $OUTPUT_FILE"
