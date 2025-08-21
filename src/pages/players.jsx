import { useMemo, useState } from "react";
import usePlayersData from "../hooks/usePlayersData";

export default function Players() {
  const { data: players, loading, error } = usePlayersData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedPosition, setSelectedPosition] = useState("All");

  const teams = useMemo(() => ["All", ...Array.from(new Set(players.map(p => p.team)))], [players]);
  const positions = useMemo(() => ["All", ...Array.from(new Set(players.map(p => p.position)))], [players]);

  const filtered = useMemo(() => {
    return players.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTeam = selectedTeam === "All" || p.team === selectedTeam;
      const matchesPos = selectedPosition === "All" || p.position === selectedPosition;
      return matchesSearch && matchesTeam && matchesPos;
    });
  }, [players, searchTerm, selectedTeam, selectedPosition]);

  if (loading) return <div style={{ padding: "2rem" }}>Loading players…</div>;
  if (error) return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Players</h1>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          placeholder="Search by name…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)}>
          {teams.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={selectedPosition} onChange={e => setSelectedPosition(e.target.value)}>
          {positions.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        {filtered.map(p => (
          <div key={p.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: "1rem" }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{p.name}</div>
            <div>Team: {p.team}</div>
            <div>Position: {p.position}</div>
            <div style={{ marginTop: 8 }}>Score: {p.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
