import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Insights from './components/Insights';
import Settings from './components/Settings'
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path='/insights' element={<Insights/>} />
        <Route path='/settings' element={<Settings/>} />
      </Routes>
    </Router>
  );
}

export default App;