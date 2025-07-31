import usePlayersData from '../hooks/usePlayersData';

export default function Players() {
  const { data: players, loading } = usePlayersData();
  
  if (loading) return <div>Loading players data...</div>;
  
  return (
    <div>
      <h1>Player Dashboard</h1>
      <p>Total players: {players.length}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {players.slice(0, 10).map((player, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <h3>{player.DisplayName}</h3>
            <p>Height: {player.Height}cm | Weight: {player.Weight}kg</p>
            <p>Position: {player.Position}</p>
            <p>Team: {player.Origin}</p>
          </div>
        ))}
      </div>
    </div>
  );
}