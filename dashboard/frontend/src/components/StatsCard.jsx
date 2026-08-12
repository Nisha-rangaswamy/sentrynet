import { useLiveData } from "../context/LiveDataContext";

function StatsCard() {
  const {
    normalTraffic,
    attackTraffic,
    accuracy,
  } = useLiveData();

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">

      <h2 className="text-xl font-semibold text-cyan-400 mb-6">
        📊 Detection Statistics
      </h2>

      <div className="space-y-5">

        <div className="flex justify-between items-center">
          <span className="text-slate-300">
            Normal Traffic
          </span>

          <span className="text-green-400 text-xl font-bold">
            {normalTraffic}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-300">
            Attack Traffic
          </span>

          <span className="text-red-400 text-xl font-bold">
            {attackTraffic}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-300">
            Detection Accuracy
          </span>

          <span className="text-cyan-400 text-xl font-bold">
            {accuracy}%
          </span>
        </div>

      </div>

    </div>
  );
}

export default StatsCard;