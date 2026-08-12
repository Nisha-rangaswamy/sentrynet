import { useLiveData } from "../context/LiveDataContext";

function EventLogs() {
  const { logs } = useLiveData();

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">

      <h2 className="text-xl font-semibold text-cyan-400 mb-6">
        📜 Live Event Logs
      </h2>

      <div className="h-64 overflow-y-auto space-y-3">

        {logs.map((log, index) => (

          <div
            key={index}
            className="bg-slate-700 hover:bg-slate-600 transition-all duration-300 rounded-lg px-4 py-3 border-l-4 border-cyan-400"
          >
            {log}
          </div>

        ))}

      </div>

    </div>
  );
}

export default EventLogs;