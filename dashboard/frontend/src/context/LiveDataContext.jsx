import { createContext, useContext, useEffect, useState } from "react";

const LiveDataContext = createContext();

export function LiveDataProvider({ children }) {

  const [normalTraffic, setNormalTraffic] = useState(280);
  const [attackTraffic, setAttackTraffic] = useState(18);
  const [accuracy, setAccuracy] = useState(96);

  const [threat, setThreat] = useState({
    level: "HIGH",
    attack: "SYN Flood",
    confidence: 97
  });

  const [logs, setLogs] = useState([
    "Traffic Generator Started",
    "Mininet Running",
    "Controller Connected"
  ]);

  useEffect(() => {

    const interval = setInterval(() => {

      setNormalTraffic(prev => prev + Math.floor(Math.random() * 25));

      setAttackTraffic(prev =>
        Math.max(5, prev + Math.floor(Math.random() * 7 - 3))
      );

      setAccuracy(prev => {
        let value = prev + (Math.random() - 0.5);
        return Number(value.toFixed(1));
      });

      const attacks = [
        "SYN Flood",
        "DDoS",
        "Port Scan",
        "UDP Flood",
        "Normal"
      ];

      const levels = [
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL"
      ];

      setThreat({
        level: levels[Math.floor(Math.random() * levels.length)],
        attack: attacks[Math.floor(Math.random() * attacks.length)],
        confidence: Math.floor(92 + Math.random() * 8)
      });

      const newLog = `${new Date().toLocaleTimeString()}  Attack Analysis Completed`;

      setLogs(prev => [newLog, ...prev.slice(0, 7)]);

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (

    <LiveDataContext.Provider
      value={{
        normalTraffic,
        attackTraffic,
        accuracy,
        threat,
        logs
      }}
    >
      {children}
    </LiveDataContext.Provider>

  );

}

export const useLiveData = () => useContext(LiveDataContext);