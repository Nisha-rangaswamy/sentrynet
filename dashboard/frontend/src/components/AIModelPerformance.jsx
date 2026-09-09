import { useEffect, useState } from "react";

function AIModelPerformance() {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const fetchModel = () => {
      fetch("http://localhost:5000/api/model")
        .then((res) => res.json())
        .then((data) => {
          console.log("Model API response:", data);
          setModel(data);
        })
        .catch((err) =>
          console.error("Error fetching model performance:", err)
        );
    };

    fetchModel();

    const interval = setInterval(fetchModel, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-cyan-400 mb-6">
        🤖 AI Model Performance
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        <div className="text-center">
          <p className="text-slate-400">Algorithm</p>
          <h3 className="text-lg font-bold text-white mt-2">
            {model ? model.algorithm : "..."}
          </h3>
        </div>

        <div className="text-center">
          <p className="text-slate-400">Dataset</p>
          <h3 className="text-lg font-bold text-white mt-2">
            {model ? model.dataset : "..."}
          </h3>
        </div>

        <div className="text-center">
          <p className="text-slate-400">Accuracy</p>
          <h3 className="text-2xl font-bold text-green-400 mt-2">
            {model ? `${model.accuracy}%` : "..."}
          </h3>
        </div>

        <div className="text-center">
          <p className="text-slate-400">Precision</p>
          <h3 className="text-2xl font-bold text-cyan-400 mt-2">
            {model ? `${model.precision}%` : "..."}
          </h3>
        </div>

        <div className="text-center">
          <p className="text-slate-400">Recall</p>
          <h3 className="text-2xl font-bold text-yellow-400 mt-2">
            {model ? `${model.recall}%` : "..."}
          </h3>
        </div>

        <div className="text-center">
          <p className="text-slate-400">F1 Score</p>
          <h3 className="text-2xl font-bold text-pink-400 mt-2">
            {model ? `${model.f1_score}%` : "..."}
          </h3>
        </div>

      </div>
    </div>
  );
}

export default AIModelPerformance;