import { useLiveData } from "../context/LiveDataContext";

function ThreatPanel() {
  const { threat } = useLiveData();

  const getThreatColor = (level) => {
    switch (level) {
      case "LOW":
        return "text-green-400";
      case "MEDIUM":
        return "text-yellow-400";
      case "HIGH":
        return "text-orange-400";
      case "CRITICAL":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">

      <h2 className="text-xl font-semibold text-cyan-400 mb-6">
        🚨 Latest Threat
      </h2>

      <div className="space-y-6">

        <div>
          <p className="text-slate-400">Threat Level</p>

          <h1 className={`text-3xl font-bold ${getThreatColor(threat.level)}`}>
            {threat.level}
          </h1>
        </div>

        <div>
          <p className="text-slate-400">Attack Type</p>

          <h2 className="text-xl font-semibold">
            {threat.attack}
          </h2>
        </div>

        <div>
          <p className="text-slate-400">Confidence</p>

          <h2 className="text-2xl text-green-400 font-bold">
            {threat.confidence}%
          </h2>
        </div>

        <div>
          <p className="text-slate-400">Status</p>

          <h2 className="text-cyan-400 font-bold">
            {threat.level === "LOW"
              ? "Monitoring"
              : threat.level === "MEDIUM"
              ? "Analyzing"
              : threat.level === "HIGH"
              ? "Mitigation Triggered"
              : "Immediate Action Required"}
          </h2>
        </div>

      </div>

    </div>
  );
}

export default ThreatPanel;