export const statusCards = [
  { title: "Mininet", status: "Running" },
  { title: "ML Model", status: "Active" },
  { title: "Traffic Generator", status: "Running" },
  { title: "Mitigation Engine", status: "Ready" },
  { title: "Controller", status: "Connected" },
];

export const detectionStats = {
  normalTraffic: 284,
  attackTraffic: 21,
  accuracy: "96%",
};

export const latestThreat = {
  level: "HIGH",
  attackType: "SYN Flood",
  confidence: "97%",
  status: "Mitigation Triggered",
};

export const blockedIPs = [
  {
    source: "10.0.0.2",
    destination: "10.0.0.3",
    attack: "SYN Flood",
    status: "Blocked",
  },
  {
    source: "10.0.0.5",
    destination: "10.0.0.7",
    attack: "Port Scan",
    status: "Blocked",
  },
  {
    source: "10.0.0.9",
    destination: "10.0.0.1",
    attack: "DDoS",
    status: "Blocked",
  },
];

export const eventLogs = [
  "10:30 Traffic Generated",
  "10:31 Flow Sent to Controller",
  "10:32 ML Model Detected SYN Flood",
  "10:32 Mitigation Triggered",
  "10:33 OpenFlow Rule Installed",
  "10:33 Malicious Traffic Blocked",
  "10:34 Network Restored",
];

export const aiModel = {
  algorithm: "Random Forest",
  dataset: "NSL-KDD",
  accuracy: "96%",
  precision: "95%",
  recall: "94%",
  f1Score: "95%",
};