import { useState } from 'react';
import useGamesData from '../hooks/useGamesData';

export default function Upload() {
  const { data: games, loading } = useGamesData();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'cards'
  
  if (loading) return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#2a2a2a', 
      color: 'white' 
    }}>
      <h2>Loading AFL games data...</h2>
      <div>Please wait while we process your dataset</div>
    </div>
  );
  
  // Filter out any invalid games
  const validGames = games.filter(game => game.HomeTeam && game.AwayTeam);
  
  // Get some quick stats
  const teams = [...new Set([
    ...validGames.map(g => g.HomeTeam),
    ...validGames.map(g => g.AwayTeam)
  ])].filter(Boolean);
  
  const seasons = [...new Set(validGames.map(g => {
    if (g.Date && typeof g.Date === 'string') {
      return g.Date.split('-')[2] || g.Date.split('/')[2];
    }
    return null;
  }))].filter(Boolean);
  
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
        background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Upload Video Page
      </h1>
      
      {/* Dataset Summary */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        background: '#1a1a1a',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #444'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <div>
            <h3 style={{ color: '#4CAF50', fontSize: '2.5rem', margin: '0' }}>{validGames.length}</h3>
            <p style={{ margin: '0.5rem 0 0 0', color: '#ccc' }}>Total Games</p>
          </div>
          <div>
            <h3 style={{ color: '#2196F3', fontSize: '2.5rem', margin: '0' }}>{teams.length}</h3>
            <p style={{ margin: '0.5rem 0 0 0', color: '#ccc' }}>AFL Teams</p>
          </div>
          <div>
            <h3 style={{ color: '#FF9800', fontSize: '2.5rem', margin: '0' }}>{seasons.length}</h3>
            <p style={{ margin: '0.5rem 0 0 0', color: '#ccc' }}>Seasons</p>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button
          onClick={() => setViewMode('list')}
          style={{
            padding: '0.5rem 1rem',
            margin: '0 0.5rem',
            backgroundColor: viewMode === 'list' ? '#4CAF50' : '#444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          List View
        </button>
        <button
          onClick={() => setViewMode('cards')}
          style={{
            padding: '0.5rem 1rem',
            margin: '0 0.5rem',
            backgroundColor: viewMode === 'cards' ? '#4CAF50' : '#444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Card View
        </button>
      </div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4CAF50' }}>
          Recent Games:
        </h3>
        
        {validGames.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No valid games data found. Please check your CSV file format.</p>
          </div>
        ) : viewMode === 'list' ? (
          /* List View */
          <div style={{ background: '#3a3a3a', borderRadius: '8px', padding: '1rem' }}>
            {validGames.slice(0, 10).map((game, index) => (
              <div key={index} style={{ 
                padding: '1rem', 
                borderBottom: index < 9 ? '1px solid #555' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {game.HomeTeam} vs {game.AwayTeam}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#ccc' }}>
                    {game.Date} • Round {game.Round} • {game.Venue}
                  </div>
                </div>
                {(game.HomeScore || game.AwayScore) && (
                  <div style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                    color: '#4CAF50',
                    textAlign: 'right'
                  }}>
                    {game.HomeScore || 0} - {game.AwayScore || 0}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Card View */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>
            {validGames.slice(0, 8).map((game, index) => (
              <div key={index} style={{ 
                background: 'linear-gradient(135deg, #3a3a3a, #2a2a2a)', 
                padding: '1.5rem', 
                borderRadius: '12px',
                border: '1px solid #555',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#ccc' }}>{game.Date}</span>
                  <span style={{ 
                    fontSize: '0.8rem', 
                    color: '#4CAF50', 
                    background: 'rgba(76, 175, 80, 0.2)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px'
                  }}>
                    Round {game.Round}
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                      {game.HomeTeam}
                    </div>
                    <div style={{ 
                      fontSize: '1.8rem', 
                      color: '#4CAF50', 
                      fontWeight: 'bold'
                    }}>
                      {game.HomeScore || 'TBD'}
                    </div>
                  </div>
                  
                  <div style={{ 
                    padding: '0 1rem', 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    color: '#666'
                  }}>
                    VS
                  </div>
                  
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                      {game.AwayTeam}
                    </div>
                    <div style={{ 
                      fontSize: '1.8rem', 
                      color: '#4CAF50', 
                      fontWeight: 'bold'
                    }}>
                      {game.AwayScore || 'TBD'}
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  textAlign: 'center', 
                  fontSize: '0.9rem', 
                  color: '#ccc',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '0.5rem',
                  borderRadius: '6px'
                }}>
                  📍 {game.Venue || 'Venue TBD'}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {validGames.length > (viewMode === 'list' ? 10 : 8) && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: '#ccc' }}>
              Showing {viewMode === 'list' ? 10 : 8} of {validGames.length} games
            </p>
            <button style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '1rem'
            }}>
              Load More Games
            </button>
          </div>
        )}
      </div>
    </div>
  );
}