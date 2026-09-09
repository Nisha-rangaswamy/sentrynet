import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function TrafficChart() {
  const [labels, setLabels] = useState([]);
  const [normalTraffic, setNormalTraffic] = useState([]);
  const [attackTraffic, setAttackTraffic] = useState([]);

  useEffect(() => {
    const fetchTraffic = () => {
      fetch("http://localhost:5000/api/traffic")
        .then((response) => response.json())
        .then((data) => {
          console.log("Traffic API response:", data);

          const time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          setLabels((prev) => {
            const newLabels = [...prev, time];
            return newLabels.slice(-7);
          });

          setNormalTraffic((prev) => {
            const newData = [
              ...prev,
              data.normal[data.normal.length - 1],
            ];
            return newData.slice(-7);
          });

          setAttackTraffic((prev) => {
            const newData = [
              ...prev,
              data.attack[data.attack.length - 1],
            ];
            return newData.slice(-7);
          });
        })
        .catch((error) => {
          console.error("Error fetching traffic data:", error);
        });
    };

    // Fetch immediately
    fetchTraffic();

    // Fetch every 3 seconds
    const interval = setInterval(fetchTraffic, 3000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Normal Traffic",
        data: normalTraffic,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.25)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Attack Traffic",
        data: attackTraffic,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.25)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    animation: {
      duration: 1000,
    },

    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "#334155",
        },
      },

      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
        grid: {
          color: "#334155",
        },
      },
    },
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg h-80">
      <h2 className="text-xl font-semibold text-cyan-400 mb-4">
        📈 Live Traffic
      </h2>

      <div className="h-56">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default TrafficChart;