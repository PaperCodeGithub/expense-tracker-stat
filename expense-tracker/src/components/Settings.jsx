import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { User, Globe, ShieldAlert, Download, Trash2} from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const pageRef = useRef();
  const [activeTab, setActiveTab] = useState('profile');
  const [currency, setCurrency] = useState('INR');
  const [notifications, setNotifications] = useState(true);

  useGSAP(() => {
    gsap.fromTo(".settings-pane-content", 
      { opacity: 0, x: 15 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [activeTab]);

  const handleExportData = () => {
    const data = localStorage.getItem('transactions');
    if (!data || data === '[]') {
      alert("No matrices found to export.");
      return;
    }
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zerotrack_ledger_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    const confirmWipe = window.confirm("Confirming this will permanently erase your local history sandbox. Proceed?");
    if (confirmWipe) {
      localStorage.removeItem('transactions');
      window.location.reload();
    }
  };

  return (
    <div ref={pageRef} className="settings-page">
      <div className="settings-frame">
        
        <aside className="settings-sidebar">
          <div className="sidebar-meta">
            <h2>Settings</h2>
          </div>
          <nav className="sidebar-nav">
            <button 
              className={`nav-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={16} /> Personal
            </button>
            <button 
              className={`nav-tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <Globe size={16} /> Environment
            </button>
            <button 
              className={`nav-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <ShieldAlert size={16} /> Core Memory
            </button>
          </nav>
        </aside>

        <main className="settings-main-panel">
          <div className="settings-pane-content">
            
            {activeTab === 'profile' && (
              <section className="pane-section">
                <div className="section-title">
                  <h3>Identity</h3>
                  <p>Configure local environment identification parameters.</p>
                </div>
                <div className="interactive-rows">
                  <div className="setting-control-row">
                    <div className="row-label">
                      <h4>Display Signifier</h4>
                      <p>The name shown across interface instances.</p>
                    </div>
                    <input type="text" className="inline-text-input" defaultValue="Root_User" />
                  </div>
                  <div className="setting-control-row disabled">
                    <div className="row-label">
                      <h4>Network Node Path</h4>
                      <p>Static cryptographic local login route.</p>
                    </div>
                    <span className="static-badge">sandbox@zerotrack.local</span>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'preferences' && (
              <section className="pane-section">
                <div className="section-title">
                  <h3>Environment Settings</h3>
                  <p>Adjust baseline processing configurations.</p>
                </div>
                <div className="interactive-rows">
                  <div className="setting-control-row">
                    <div className="row-label">
                      <h4>Base Denomination</h4>
                      <p>The formatting currency layer.</p>
                    </div>
                    <select 
                      className="inline-select" 
                      value={currency} 
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                  <div className="setting-control-row">
                    <div className="row-label">
                      <h4>Interface Pushes</h4>
                      <p>Toggle real-time engine logs.</p>
                    </div>
                    <label className="tactile-switch">
                      <input 
                        type="checkbox" 
                        checked={notifications} 
                        onChange={() => setNotifications(!notifications)} 
                      />
                      <span className="tactile-slider"></span>
                    </label>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'security' && (
              <section className="pane-section">
                <div className="section-title text-danger">
                  <h3>Core Memory Management</h3>
                  <p>Destructive utilities and data extractions.</p>
                </div>
                <div className="interactive-rows">
                  <div className="setting-control-row action-row" onClick={handleExportData}>
                    <div className="row-label">
                      <h4>Export Transaction Arrays</h4>
                      <p>Compile current local logs into an offline JSON matrix block.</p>
                    </div>
                    <button className="icon-action-trigger"><Download size={16} /></button>
                  </div>
                  <div className="setting-control-row action-row danger-row" onClick={handleClearData}>
                    <div className="row-label">
                      <h4>Purge System Memory</h4>
                      <p>Irreversibly wipe all browser sandbox transaction clusters.</p>
                    </div>
                    <button className="icon-action-trigger text-danger"><Trash2 size={16} /></button>
                  </div>
                </div>
              </section>
            )}

          </div>
        </main>

      </div>
    </div>
  );
}