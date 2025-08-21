import { useEffect, useState } from "react";
import { api } from "../api";

export default function useStatsData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let interval;

    async function fetchMetrics() {
      try {
        const metrics = await api.getMetrics();
        // simulate dynamic updates
        metrics.cpu = Math.floor(Math.random() * 100);
        metrics.memory = Math.floor(Math.random() * 100);
        metrics.uptime += 5;
        setData(metrics);
      } catch (err) {
        console.error("Failed to fetch metrics:", err);
      }
    }

    fetchMetrics();
    interval = setInterval(fetchMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  return data;
}
