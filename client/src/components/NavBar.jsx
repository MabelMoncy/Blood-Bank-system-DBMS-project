import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HeartPulse, Users, Handshake, Info } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/donors', label: 'Donor' },
  { to: '/acceptors', label: 'Acceptor' },
  { to: '/matching', label: 'Matching' },
  { to: '/about', label: 'About' },
];

const formatClock = (value) =>
  value.toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'medium' });

const NavBar = ({ stats }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="nav-shell">
      <div className="nav-brand">
        <div className="brand-icon">
          <HeartPulse size={20} />
        </div>
        <div>
          <p className="eyebrow">Blood Bank</p>
          <h1>BLOOD BANK MANAGEMENT</h1>
        </div>
      </div>

      <nav className="nav-links">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav-meta">
        <div className="meta-card">
          <Users size={16} />
          <span>Donors</span>
          <strong>{stats?.donorCount ?? '—'}</strong>
        </div>
        <div className="meta-card">
          <Handshake size={16} />
          <span>Acceptors</span>
          <strong>{stats?.acceptorCount ?? '—'}</strong>
        </div>
        <div className="meta-card subtle">
          <Info size={16} />
          <span>{formatClock(now)}</span>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
