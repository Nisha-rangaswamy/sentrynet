from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# --------------------------------------------------
# HOME
# --------------------------------------------------

@app.route("/")
def home():
    return jsonify({
        "message": "SentryNet Backend is running"
    })


# --------------------------------------------------
# SYSTEM STATUS
# --------------------------------------------------

@app.route("/api/status")
def status():
    return jsonify({
        "mininet": "Online",
        "ml_model": "Online",
        "traffic_generator": "Online",
        "mitigation_engine": "Online",
        "controller": "Online"
    })


# --------------------------------------------------
# THREAT STATISTICS
# --------------------------------------------------

@app.route("/api/threats")
def threats():
    return jsonify({
        "total_threats": 127,
        "active_threats": 3,
        "blocked_threats": 124
    })


# --------------------------------------------------
# BLOCKED IPs
# --------------------------------------------------

@app.route("/api/blocked-ips")
def blocked_ips():
    return jsonify([
        {
            "ip": "10.0.0.2",
            "attack": "SYN Flood",
            "status": "Blocked"
        },
        {
            "ip": "10.0.0.3",
            "attack": "Port Scan",
            "status": "Blocked"
        }
    ])


# --------------------------------------------------
# EVENT LOGS
# --------------------------------------------------

@app.route("/api/events")
def events():
    return jsonify([
        {
            "time": "20:15:30",
            "event": "SYN Flood detected",
            "severity": "High"
        },
        {
            "time": "20:14:52",
            "event": "Suspicious port scan detected",
            "severity": "Medium"
        }
    ])


# --------------------------------------------------
# TRAFFIC DATA
# --------------------------------------------------

@app.route("/api/traffic")
def traffic():
    return jsonify({
        "normal": [310, 350, 420, 280, 490, 410, 450],
        "attack": [8, 12, 7, 18, 5, 10, 20]
    })


# --------------------------------------------------
# ML MODEL PERFORMANCE
# --------------------------------------------------

@app.route("/api/model")
def model():
    return jsonify({
        "algorithm": "Random Forest",
        "dataset": "NSL-KDD",
        "accuracy": 96,
        "precision": 95,
        "recall": 94,
        "f1_score": 95
    })


# --------------------------------------------------
# START SERVER
# --------------------------------------------------

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )