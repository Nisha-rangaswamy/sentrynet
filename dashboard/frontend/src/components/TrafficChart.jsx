import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function TrafficChart() {

  const [labels, setLabels] = useState([
    "10:00",
    "10:05",
    "10:10",
    "10:15",
    "10:20",
    "10:25",
    "10:30",
  ]);

  const [normalTraffic, setNormalTraffic] = useState([
    120, 180, 210, 260, 310, 350, 420,
  ]);

  const [attackTraffic, setAttackTraffic] = useState([
    5, 8, 6, 15, 18, 25, 20,
  ]);

  useEffect(() => {

    const interval = setInterval(() => {

      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setLabels((prev) => [...prev.slice(1), time]);

      setNormalTraffic((prev) => [
        ...prev.slice(1),
        250 + Math.floor(Math.random() * 250),
      ]);

      setAttackTraffic((prev) => [
        ...prev.slice(1),
        5 + Math.floor(Math.random() * 30),
      ]);

    }, 3000);

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