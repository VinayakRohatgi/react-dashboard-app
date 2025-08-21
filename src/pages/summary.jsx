import useStatsData from "../hooks/useStatsData";

export default function Summary() {
  const { data: metrics, loading, error } = useStatsData();

  if (loading) return <div style={{ padding: "2rem" }}>Loading metrics…</div>;
  if (error) return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Sprint Summary</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: 8 }}>
          <div style={{ fontWeight: 600 }}>CPU</div>
          <div style={{ fontSize: 28 }}>{metrics.cpu}%</div>
        </div>
        <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: 8 }}>
          <div style={{ fontWeight: 600 }}>Memory</div>
          <div style={{ fontSize: 28 }}>{metrics.memory}%</div>
        </div>
        <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: 8 }}>
          <div style={{ fontWeight: 600 }}>Uptime</div>
          <div style={{ fontSize: 28 }}>{metrics.uptime}s</div>
        </div>
      </div>
      <p style={{ color: "#666" }}>These tiles update every ~5 seconds from /mock/metrics.json.</p>
    </div>
  );
}
