import useInferenceData from "../hooks/useInferenceData";

export default function Crowd() {
  const { data, loading, error } = useInferenceData();

  if (loading) return <div style={{ padding: "2rem" }}>Loading crowd…</div>;
  if (error) return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Crowd View</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: 8 }}>
          <div style={{ fontWeight: 600 }}>Count</div>
          <div style={{ fontSize: 28 }}>{data.count}</div>
        </div>
        <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: 8 }}>
          <div style={{ fontWeight: 600 }}>Average Age</div>
          <div style={{ fontSize: 28 }}>{data.averageAge}</div>
        </div>
        <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: 8 }}>
          <div style={{ fontWeight: 600 }}>Last Update</div>
          <div style={{ fontSize: 14 }}>{data.timestamp}</div>
        </div>
      </div>
    </div>
  );
}
