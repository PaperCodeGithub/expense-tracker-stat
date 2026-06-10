import { NavLink, Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="nav-brand">
          <Activity size={24} color="#000000" />
          <span>FIN<span style={{ color: '#c4b5fd' }}>TRACK</span></span>
        </Link>
        
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/history">History</NavLink>
          <NavLink to="/insights">Insights</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </div>
      </div>
    </nav>
  );
}