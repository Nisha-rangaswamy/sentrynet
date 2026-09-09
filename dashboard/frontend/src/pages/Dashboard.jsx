import { useEffect, useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatusCard from "../components/StatusCard";
import TrafficChart from "../components/TrafficChart";
import StatsCard from "../components/StatsCard";
import NetworkTopology from "../components/NetworkTopology";
import ThreatPanel from "../components/ThreatPanel";
import BlockedIP from "../components/BlockedIP"; 
import EventLogs from "../components/EventLogs";
import AIModelPerformance from "../components/AIModelPerformance";
import Footer from "../components/Footer";

function Dashboard() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/status")
      .then((response) => response.json())
      .then((data) => {
        console.log("SentryNet API response:", data);
        setStatus(data);
      })
      .catch((error) => {
        console.error("Error connecting to SentryNet backend:", error);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Dashboard */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
            <StatusCard
              title="Mininet"
              status={status ? status.mininet : "Loading..."}
            />
            <StatusCard
              title="ML Model"
              status={status ? status.ml_model : "Loading..."}
            />
            <StatusCard
              title="Traffic Generator"
              status={status ? status.traffic_generator : "Loading..."}
            />
            <StatusCard
              title="Mitigation Engine"
              status={status ? status.mitigation_engine : "Loading..."}
            />
            <StatusCard
              title="Controller"
              status={status ? status.controller : "Loading..."}
            />
          </div>

          {/* Traffic + Statistics */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
            <TrafficChart />
            <StatsCard />
          </div>

          {/* Topology + Threat */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
            <NetworkTopology />
            <ThreatPanel />
          </div>

          {/* Blocked IP + Logs */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
            <BlockedIP /> {/* Changed from <BlockedIPs /> */}
            <EventLogs />
          </div>

          {/* AI Model */}
          <div className="mt-8">
            <AIModelPerformance />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;