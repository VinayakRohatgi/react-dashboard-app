import useStatsData from '../hooks/useStatsData';

export default function Summary() {
  const { data: stats, loading } = useStatsData();
  
  if (loading) return <div>Loading stats data...</div>;
  
  // Calculate some summary statistics
  const totalGoals = stats.reduce((sum, player) => sum + (player.Goals || 0), 0);
  const totalKicks = stats.reduce((sum, player) => sum + (player.Kicks || 0), 0);
  const avgMarks = stats.length > 0 ? (stats.reduce((sum, player) => sum + (player.Marks || 0), 0) / stats.length).toFixed(1) : 0;
  
  return (
    <div>
      <h1>Sprint Summary & Export</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
          <h3>Total Goals</h3>
          <p style={{ fontSize: '2rem', margin: 0 }}>{totalGoals}</p>
        </div>
        <div style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
          <h3>Total Kicks</h3>
          <p style={{ fontSize: '2rem', margin: 0 }}>{totalKicks}</p>
        </div>
        <div style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
          <h3>Avg Marks</h3>
          <p style={{ fontSize: '2rem', margin: 0 }}>{avgMarks}</p>
        </div>
      </div>
      
      <h3>Top Performers:</h3>
      <div>
        {stats
          .sort((a, b) => (b.Goals || 0) - (a.Goals || 0))
          .slice(0, 5)
          .map((player, index) => (
            <div key={index} style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>
              {player.DisplayName}: {player.Goals || 0} goals, {player.Marks || 0} marks
            </div>
          ))
        }
      </div>
    </div>
  );
}