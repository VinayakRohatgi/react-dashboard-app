import { useEffect, useState } from "react";
import { api } from "../api";

export default function usePlayersData() {
  const [state, setState] = useState({ data: [], loading: true, error: null });

  useEffect(() => {
    let timer;

    async function fetchPlayers() {
      try {
        const players = await api.getPlayers();

        // Simulate minor score drift to feel “live”
        const updated = players.map(p => ({
          ...p,
          score: Math.max(0, p.score + (Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 3)))
        }));

        setState({ data: updated, loading: false, error: null });
      } catch (err) {
        console.error("Failed to fetch players:", err);
        setState(s => ({ ...s, loading: false, error: "Failed to fetch players" }));
      }
    }

    fetchPlayers();
    timer = setInterval(fetchPlayers, 5000);

    return () => clearInterval(timer);
  }, []);

  return state; // { data, loading, error }
}
