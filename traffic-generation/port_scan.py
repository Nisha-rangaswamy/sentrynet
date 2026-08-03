#!/usr/bin/env python3

from scapy.all import IP,TCP,sr1
import sys

def scan_port(target_ip,port):
	packet=IP(dst=target_ip)/TCP(dport=port,flags="S")
	response=sr1(packet,timeout=1,verbose=0)

	if response:
		if response.haslayer(TCP):
			if response[TCP].flags==0x12:
				print(f"[OPEN] Port {port}")
			elif response[TCP].flags==0x14:
				print(f"[CLOSED] Port {port}")
		else:
			print(f"[UNKNOWN] Port {port}")
	else:
		print(f"[FILTERED] Port {port}")

def main():
	if len(sys.argv)!=2:
		print("Usage: pyhton3 port_scan.py <target_ip>")
		print("Example: python3 port_scan.py 10.0.0.2")
		sys.exit(1)
	target_ip=sys.argv[1]

	print("==========================================")
	print("           SentryNet Port Scanner")
	print("==========================================")
	ports=[22,23,53,80,443,8080]
	for port in ports:
		scan_port(target_ip,port)

if __name__=="__main__":
	main()
