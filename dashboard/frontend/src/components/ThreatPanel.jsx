import { useEffect, useState } from "react";

function ThreatPanel() {
  const [threats, setThreats] = useState(null);

  useEffect(() => {
  const fetchThreats = () => {
    fetch("http://localhost:5000/api/threats")
      .then((res) => res.json())
      .then((data) => {
        console.log("Threat Panel API response:", data);
        setThreats(data);
      })
      .catch((err) =>
        console.error("Error fetching threats:", err)
      );
  };

  fetchThreats();

  const interval = setInterval(fetchThreats, 3000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-400 mb-4">
        ⚠️ Threat Metrics
      </h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
          <p className="text-slate-400 text-sm">Total Threats</p>
          <p className="text-2xl font-bold text-white">
            {threats ? threats.total_threats : "..."}
          </p>
        </div>
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
          <p className="text-slate-400 text-sm">Active</p>
          <p className="text-2xl font-bold text-red-400">
            {threats ? threats.active_threats : "..."}
          </p>
        </div>
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
          <p className="text-slate-400 text-sm">Blocked</p>
          <p className="text-2xl font-bold text-green-400">
            {threats ? threats.blocked_threats : "..."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ThreatPanel;