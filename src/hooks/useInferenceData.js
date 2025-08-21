import { useEffect, useState } from "react";
import { api } from "../api";

export default function useInferenceData() {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let timer;

    async function fetchCrowd() {
      try {
        const c = await api.getCrowd();
        const bumped = {
          ...c,
          timestamp: new Date().toISOString() // simulate fresh inference time
        };
        setState({ data: bumped, loading: false, error: null });
      } catch (err) {
        console.error("Failed to fetch crowd:", err);
        setState(s => ({ ...s, loading: false, error: "Failed to fetch crowd" }));
      }
    }

    fetchCrowd();
    timer = setInterval(fetchCrowd, 5000);

    return () => clearInterval(timer);
  }, []);

  return state; // { data, loading, error }
}
