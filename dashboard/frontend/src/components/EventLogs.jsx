import { useEffect, useState } from "react";

function EventLogs() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
  const fetchEvents = () => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        console.log("Events API response:", data);
        setEvents(data);
      })
      .catch((err) => console.error("Error fetching events:", err));
  };

  fetchEvents();

  const interval = setInterval(fetchEvents, 3000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-400 mb-4">
        📜 Live Event Logs
      </h2>
      <div className="space-y-3">
        {events.length > 0 ? (
          events.map((log, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg border border-slate-600/50 text-sm"
            >
              <span className="text-slate-400 font-mono">{log.time}</span>
              <span className="text-slate-200 font-medium">{log.event}</span>
              <span
                className={`px-2 py-1 text-xs rounded font-semibold ${
                  log.severity === "High"
                    ? "bg-red-500/20 text-red-300"
                    : "bg-yellow-500/20 text-yellow-300"
                }`}
              >
                {log.severity}
              </span>
            </div>
          ))
        ) : (
          <p className="text-slate-400">Loading events...</p>
        )}
      </div>
    </div>
  );
}

export default EventLogs;