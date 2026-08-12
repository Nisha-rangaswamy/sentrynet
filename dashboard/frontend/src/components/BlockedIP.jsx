import { useEffect, useState } from "react";

function BlockedIP() {
  const attacks = [
    "SYN Flood",
    "DDoS",
    "Port Scan",
    "UDP Flood",
    "ICMP Flood",
  ];

  const generateIP = () => {
    return `10.0.0.${Math.floor(Math.random() * 20) + 1}`;
  };

  const [blockedIPs, setBlockedIPs] = useState([
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
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEntry = {
        source: generateIP(),
        destination: generateIP(),
        attack: attacks[Math.floor(Math.random() * attacks.length)],
        status: "Blocked",
      };

      setBlockedIPs((previousIPs) => [
        newEntry,
        ...previousIPs.slice(0, 7),
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">

      <h2 className="text-xl font-semibold text-cyan-400 mb-4">
        🚫 Blocked IPs
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">

          <thead>
            <tr className="border-b border-slate-600">
              <th className="py-2">Source</th>
              <th>Destination</th>
              <th>Attack</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {blockedIPs.map((ip, index) => (
              <tr
                key={index}
                className="border-b border-slate-700 hover:bg-slate-700 transition-colors"
              >
                <td className="py-3 font-mono">
                  {ip.source}
                </td>

                <td className="font-mono">
                  {ip.destination}
                </td>

                <td className="text-red-400 font-semibold">
                  {ip.attack}
                </td>

                <td>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {ip.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default BlockedIP;