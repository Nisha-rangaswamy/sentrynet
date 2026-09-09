import { useEffect, useState } from "react";

function StatsCard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = () => {
      fetch("http://localhost:5000/api/threats")
        .then((response) => response.json())
        .then((data) => {
          console.log("Threat API response:", data);
          setStats(data);
        })
        .catch((error) => {
          console.error("Error fetching threat statistics:", error);
        });
    };

    // Fetch immediately
    fetchStats();

    // Refresh every 3 seconds
    const interval = setInterval(fetchStats, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">

      <h2 className="text-xl font-semibold text-cyan-400 mb-6">
        📊 Detection Statistics
      </h2>

      <div className="space-y-5">

        <div className="flex justify-between items-center">
          <span className="text-slate-300">
            Total Threats
          </span>

          <span className="text-yellow-400 text-xl font-bold">
            {stats ? stats.total_threats : "Loading..."}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-300">
            Active Threats
          </span>

          <span className="text-red-400 text-xl font-bold">
            {stats ? stats.active_threats : "Loading..."}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-300">
            Blocked Threats
          </span>

          <span className="text-green-400 text-xl font-bold">
            {stats ? stats.blocked_threats : "Loading..."}
          </span>
        </div>

      </div>

    </div>
  );
}

export default StatsCard;