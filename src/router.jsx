import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Upload from './pages/upload';
import Players from './pages/players';
import Crowds from './pages/crowds';
import Summary from './pages/summary';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/player" element={<Players />} />
        <Route path="/crowd" element={<Crowds />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;