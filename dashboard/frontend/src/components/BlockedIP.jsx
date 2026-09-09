import { useEffect, useState } from "react";

function BlockedIP() {
  const [blockedIPs, setBlockedIPs] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5000/api/blocked-ips")
        .then((res) => res.json())
        .then((data) => setBlockedIPs(data))
        .catch((err) => console.error("Error fetching blocked IPs:", err));
    };

    fetchData(); // Fetch immediately when loaded
    const interval = setInterval(fetchData, 3000); // Re-fetch every 3 seconds

    return () => clearInterval(interval); // Clean up timer when component unmounts
  }, []);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-400 mb-4">🚫 Blocked IPs</h2>
      <div className="space-y-3">
        {blockedIPs.map((item, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
            <span className="font-mono text-slate-200">{item.ip}</span>
            <span className="text-red-400 font-medium">{item.attack}</span>
            <span className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-300 font-semibold">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlockedIP;