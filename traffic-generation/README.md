"# Traffic Generation & Dataset"

##Objective
Generate both normal and malicious network for the SentryNet intrusion detection system.

##Normal Traffic
Normal traffic simulates legitimate communication between hosts in the Mininet network.

Examples:
-ICMP Ping
-HTTP requests
-TCP connections
-File transfer

##Attack Traffic

###SYN Flood
**Tool:** hping3

**Purpose:**
Generate a large number of TCP SYN packets to simulate a Denial-of-Service (DOS)

###Port Scan
**Tool:** Scapy

**Purpose:**
Send TCP SYN packets to multiple ports to identify open services on the target host.

##Dataset Features
The generated dataset will include:
-Source IP
-Destination IP
-Source Port
-Destination Port
-Protocol
-Packet Count
-Byte Count
Flow Duration
-Label (Normal/Attack) 
