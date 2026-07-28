# SentryNet

### AI-powered intrusion detection and auto-mitigation for software-defined networks

SentryNet is a closed-loop network security system: it simulates a software-defined network, detects malicious traffic (DDoS/SYN flood and port-scan patterns) in real time using a machine learning classifier, automatically blocks it at the controller level, and visualizes the entire process on a live dashboard.

---

## Problem

Conventional networks detect attacks only after impact and rely on manual intervention to respond. SentryNet closes that gap with an automated detect → classify → mitigate → visualize pipeline.

## Architecture

```
Mininet simulated network
        ↓
Ryu SDN controller (OpenFlow) — collects real-time flow statistics
        ↓
ML classifier (scikit-learn, Random Forest) — normal vs malicious
        ↓
Auto-mitigation module — installs block rule on detected attack
        ↓
Live dashboard (Flask + Chart.js) — traffic, alerts, blocked IPs
```

## Tech Stack

| Layer | Tool |
|---|---|
| Network simulation | Mininet |
| SDN Controller | Ryu (OpenFlow) |
| Attack simulation | hping3, Scapy |
| ML model | scikit-learn |
| Dashboard | Flask, Chart.js |
| CI/CD | GitHub Actions |

## Repository Structure

```
sentrynet/
├── README.md              This file
├── PRD.md                 Full product requirements document
├── network-design/        SDN topology and controller logic
├── traffic-generation/     Normal + attack traffic simulation, dataset creation
├── ml-model/               Feature engineering, model training, evaluation
├── dashboard/              Auto-mitigation logic and live dashboard
└── docs/
    └── weekly-progress.md  Week-by-week build log
```

## Project Timeline

| Week | Milestone |
|---|---|
| 1 | Network topology set up, tools installed |
| 2 | Normal + attack traffic generated and captured |
| 3 | Dataset cleaned and prepared for ML |
| 4 | Classifier trained and evaluated |
| 5 | Model integrated for real-time classification |
| 6 | Auto-mitigation implemented |
| 7 | Dashboard built and connected to live data |
| 8 | Full integration test, demo video, final documentation |

## Team

| Member | Role |
|---|---|
| Nischitha | SDN topology design & controller logic |
| Nisha | Traffic generation & flow-data labeling |
| Akshatha | Feature engineering & model training/evaluation |
| Monika | Auto-mitigation logic & real-time dashboard |

## Status

🚧 In progress — Week 1 of 8. See [`docs/weekly-progress.md`](docs/weekly-progress.md) for the latest updates.



Setup instructions for each module are in that module's own README (`network-design/README.md`, `ml-model/README.md`, etc.).

