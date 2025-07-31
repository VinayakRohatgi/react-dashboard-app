import useGamesData from '../hooks/useGamesData';

export default function Upload() {
  const { data: games, loading } = useGamesData();
  
  if (loading) return <div>Loading games data...</div>;
  
  return (
    <div>
      <h1>Upload Video Page</h1>
      <p>Total games in dataset: {games.length}</p>
      <div>
        <h3>Recent Games:</h3>
        {games.slice(0, 5).map((game, index) => (
          <div key={index}>
            {game.Date} - {game.HomeTeam} vs {game.AwayTeam}
          </div>
        ))}
      </div>
    </div>
  );
}