import axios from "axios";

const BASE_URL = "/mock";

export const api = {
  getMetrics: async () => {
    const res = await axios.get(`${BASE_URL}/metrics.json`, { headers: { "Cache-Control": "no-cache" } });
    return res.data;
  },
  getCrowd: async () => {
    const res = await axios.get(`${BASE_URL}/crowd.json`, { headers: { "Cache-Control": "no-cache" } });
    return res.data;
  },
  getPlayers: async () => {
    const res = await axios.get(`${BASE_URL}/players.json`, { headers: { "Cache-Control": "no-cache" } });
    return res.data;
  },
};
