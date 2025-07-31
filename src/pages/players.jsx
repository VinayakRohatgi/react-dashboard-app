import { useState } from 'react';
import usePlayersData from '../hooks/usePlayersData';

export default function Players() {
  const { data: players, loading } = usePlayersData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('All');
  const [selectedPosition, setSelectedPosition] = useState('All');
  
  if (loading) return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#2a2a2a', 
      color: 'white' 
    }}>
      <h2>Loading players data...</h2>
    </div>
  );

  // Process players data to handle formatting issues
  const processedPlayers = players.map(player => ({
    ...player,
    DisplayName: String(player.DisplayName || player.DisplayNa || 'Unknown Player').trim(),
    Height: player.Height && !isNaN(player.Height) ? parseInt(player.Height) : 0,
    Weight: player.Weight && !isNaN(player.Weight) ? parseInt(player.Weight) : 0,
    Position: String(player.Position || 'Unknown').trim(),
    Origin: String(player.Origin || 'Unknown').trim(),
  })).filter(player => player.DisplayName !== 'Unknown Player');

  // Get unique teams and positions for filters
  const teams = ['All', ...new Set(processedPlayers.map(p => p.Origin).filter(t => t !== 'Unknown'))].sort();
  const positions = ['All', ...new Set(processedPlayers.map(p => p.Position).filter(p => p !== 'Unknown'))].sort();

  // Filter players
  const filteredPlayers = processedPlayers.filter(player => {
    const matchesSearch = player.DisplayName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'All' || player.Origin === selectedTeam;
    const matchesPosition = selectedPosition === 'All' || player.Position === selectedPosition;
    return matchesSearch && matchesTeam && matchesPosition;
  });

  // Get position distribution
  const positionStats = positions.slice(1).map(pos => ({
    position: pos,
    count: processedPlayers.filter(p => p.Position === pos).length
  })).sort((a, b) => b.count - a.count);
  
  return (
    <div style={{ 
      padding: '2rem', 
      minHeight: '100vh', 
      backgroundColor: '#2a2a2a', 
      color: 'white' 
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '1rem', 
        textAlign: 'center',
        background: 'linear-gradient(45deg, #2196F3, #9C27B0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Player Dashboard
      </h1>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Stats Overview */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem', 
          marginBottom: '2rem' 
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)', 
            padding: '1.5rem', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #444'
          }}>
            <h3 style={{ color: '#2196F3', fontSize: '2.5rem', margin: '0' }}>
              {processedPlayers.length}
            </h3>
            <p style={{ margin: '0.5rem 0 0 0', color: '#ccc' }}>Total Players</p>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)', 
            padding: '1.5rem', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #444'
          }}>
            <h3 style={{ color: '#4CAF50', fontSize: '2.5rem', margin: '0' }}>
              {teams.length - 1}
            </h3>
            <p style={{ margin: '0.5rem 0 0 0', color: '#ccc' }}>Teams</p>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)', 
            padding: '1.5rem', 
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #444'
          }}>
            <h3 style={{ color: '#FF9800', fontSize: '2.5rem', margin: '0' }}>
              {filteredPlayers.length}
            </h3>
            <p style={{ margin: '0.5rem 0 0 0', color: '#ccc' }}>Filtered</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div style={{ 
          background: '#3a3a3a', 
          padding: '1.5rem', 
          borderRadius: '12px', 
          marginBottom: '2rem',
          border: '1px solid #555'
        }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <input
                type="text"
                placeholder="🔍 Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #555',
                  backgroundColor: '#2a2a2a',
                  color: 'white',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid #555',
                backgroundColor: '#2a2a2a',
                color: 'white',
                fontSize: '1rem',
                minWidth: '120px'
              }}
            >
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>

            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid #555',
                backgroundColor: '#2a2a2a',
                color: 'white',
                fontSize: '1rem',
                minWidth: '120px'
              }}
            >
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Position Distribution */}
        <div style={{ 
          background: '#3a3a3a', 
          padding: '1.5rem', 
          borderRadius: '12px', 
          marginBottom: '2rem',
          border: '1px solid #555'
        }}>
          <h3 style={{ color: '#4CAF50', marginBottom: '1rem' }}>Position Distribution</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {positionStats.slice(0, 6).map(stat => (
              <div key={stat.position} style={{ 
                background: '#2a2a2a', 
                padding: '1rem', 
                borderRadius: '8px', 
                textAlign: 'center' 
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4CAF50' }}>
                  {stat.count}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#ccc' }}>
                  {stat.position}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Players Grid */}
        {filteredPlayers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: '#3a3a3a', borderRadius: '12px' }}>
            <h3>No players found</h3>
            <p style={{ color: '#ccc' }}>Try adjusting your search criteria</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filteredPlayers.slice(0, 24).map((player, index) => (
              <div key={index} style={{ 
                background: 'linear-gradient(135deg, #3a3a3a, #2a2a2a)', 
                padding: '1.5rem', 
                borderRadius: '12px',
                border: '1px solid #555',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
              }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ 
                    margin: '0', 
                    color: '#4CAF50', 
                    fontSize: '1.3rem',
                    fontWeight: 'bold'
                  }}>
                    {player.DisplayName}
                  </h3>
                  <span style={{ 
                    background: 'rgba(76, 175, 80, 0.2)', 
                    color: '#4CAF50', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '12px', 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {player.Position}
                  </span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2196F3' }}>
                      {player.Height > 0 ? player.Height : 'N/A'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#ccc' }}>Height (cm)</div>
                  </div>
                  <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF9800' }}>
                      {player.Weight > 0 ? player.Weight : 'N/A'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#ccc' }}>Weight (kg)</div>
                  </div>
                </div>
                
                <div style={{ 
                  textAlign: 'center', 
                  background: 'rgba(156, 39, 176, 0.2)', 
                  color: '#9C27B0', 
                  padding: '0.75rem', 
                  borderRadius: '8px',
                  fontWeight: 'bold'
                }}>
                  🏟️ {player.Origin}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {filteredPlayers.length > 24 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: '#ccc' }}>Showing 24 of {filteredPlayers.length} players</p>
            <button style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '1rem'
            }}>
              Load More Players
            </button>
          </div>
        )}
      </div>
    </div>
  );
}