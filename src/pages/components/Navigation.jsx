export default function Navigation() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <a href="/upload" style={{ margin: '0 1rem' }}>Upload</a>
      <a href="/player" style={{ margin: '0 1rem' }}>Players</a>
      <a href="/crowd" style={{ margin: '0 1rem' }}>Crowd</a>
      <a href="/summary" style={{ margin: '0 1rem' }}>Summary</a>
    </nav>
  );
}