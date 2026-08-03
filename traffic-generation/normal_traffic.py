#!/usr/bin/env python3

import sys
import time
import subprocess

def generate_ping(target_ip):
	print(f"[INFO] Sending ping to {target_ip}...")
	subprocess.run(["ping","-c","5",target_ip])

def main():
	if len(sys.argv)!=2:
		print("Usage: python3 normal_traffic.py <target_ip>")
		print("Example: python3 normal_traffic.py 10.0.0.2")
		sys.exit(1)
	target_ip=sys.argv[1]

	print("=================================================")
	print("     SentryNet Normal Traffic")
	print("=================================================")

	try:
		while True:
			generate_ping(target_ip)
			time.sleep(3)
	except KeyboardInterrupt:
		print("\n[INFO] Traffic generation stopped.")

if __name__=="__main__":
	main()
