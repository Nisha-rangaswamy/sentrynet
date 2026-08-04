import requests
CONTROLLER_URL="http://127.0.0.1:8080"
MITIGATION_ENDPOINT="/mitigate"

def request_mitigation(src_ip,dst_ip,attack_type):
	url=CONTROLLER_URL+MITIGATE_ENDPOINT
	date={
		"src_ip":src_ip,
		"dst_ip":dst_ip,
		"attack_type":attack_type
	}
	try:
		response=request.post(
			url,
			json=data,
			timeout=5
		)
		print("Controller response:",response.status_code)
		print("Response:",response.text)
		return response.status_code==200
	except requests.exceptions.RequestException as e:
		print("Could not connect controller:",e)
		return False

if __name__=="__main__":
	request_mitigation(
		"10.0.0.2",
		"10.0.0.3",
		"DDos"
	)
