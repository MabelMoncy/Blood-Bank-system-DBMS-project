import { Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Donors from './pages/Donors';
import Acceptors from './pages/Acceptors';
import Matching from './pages/Matching';
import About from './pages/About';
import { fetchStats } from './api/client';

function App() {
  const { data: stats } = useQuery({ queryKey: ['stats'], queryFn: fetchStats });

  return (
    <div className="app-shell">
      <NavBar stats={stats} />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/acceptors" element={<Acceptors />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <footer>
        <p>Developed for the Blood Bank Management initiative · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
