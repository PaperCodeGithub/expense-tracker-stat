import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaTrash, FaSearch, FaArrowUp, FaArrowDown, FaCalendarAlt } from 'react-icons/fa';
import './History.css';
import SphereBackground from './SphereBackground';

export default function History() {
  const historyRef = useRef();
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); 

  
  useEffect(() => {
    const savedData = localStorage.getItem('transactions');
    if (savedData) {
      try {
        setTransactions(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse ledger history:", e);
      }
    }
  }, []);


  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".history-title-block", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    })
    .from(".filter-bar-card", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3")
    .from(".ledger-row", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out"
    }, "-=0.2");
  }, { scope: historyRef });

  const handleDeleteRecord = (id) => {
    const updated = transactions.filter(tx => tx.id !== id);
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
  };

  const handleWipeLedger = () => {
    if (window.confirm("Are you absolutely sure you want to permanently clear your entire financial ledger local history?")) {
      setTransactions([]);
      localStorage.removeItem('transactions');
    }
  };

  const formatCurrency = (value) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(Math.abs(value));
    return value >= 0 ? `+ ${formatted}` : `- ${formatted}`;
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'income') return matchesSearch && tx.amount >= 0;
    if (filterType === 'expense') return matchesSearch && tx.amount < 0;
    return matchesSearch;
  });

  return (
    <div ref={historyRef} className="history-page">
        <SphereBackground />
      <div className="history-container">
        <div className="history-title-block">
          <div>
            <h1 className="page-main-heading">Financial Ledger</h1>
            <p className="page-sub-heading">Audit, filter, and track structural statements from your local sandbox storage.</p>
          </div>
          {transactions.length > 0 && (
            <button className="wipe-ledger-btn" onClick={handleWipeLedger}>
              Wipe All Records
            </button>
          )}
        </div>

        <div className="glass-card filter-bar-card">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search statements by keyword..." 
              className="ledger-search-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-button-cluster">
            <button 
              className={`filter-tab ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All Activity
            </button>
            <button 
              className={`filter-tab ${filterType === 'income' ? 'active-income' : ''}`}
              onClick={() => setFilterType('income')}
            >
              Income
            </button>
            <button 
              className={`filter-tab ${filterType === 'expense' ? 'active-expense' : ''}`}
              onClick={() => setFilterType('expense')}
            >
              Expenses
            </button>
          </div>
        </div>

        <div className="glass-card ledger-table-card">
          <div className="ledger-sheet-headers">
            <span>Statement Details</span>
            <span>Timestamp</span>
            <span style={{ textAlign: 'right', paddingRight: '2.5rem' }}>Value (INR)</span>
          </div>

          <div className="ledger-rows-container">
            {filteredTransactions.length === 0 ? (
              <div className="empty-ledger-fallback">
                <FaCalendarAlt size={32} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                <p>No ledger entries match your filter criteria or data is empty.</p>
              </div>
            ) : (
              filteredTransactions.map((tx) => (
                <div key={tx.id} className="ledger-row">
                  <div className="ledger-col-info">
                    <div className={`tx-indicator-pill ${tx.amount >= 0 ? 'inc' : 'exp'}`}>
                      {tx.amount >= 0 ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
                    </div>
                    <span className="ledger-tx-name">{tx.name}</span>
                  </div>

                  <div className="ledger-col-time">
                    <span className="ledger-tx-time">{tx.time}</span>
                  </div>

                  <div className="ledger-col-actions">
                    <span className={`ledger-tx-val ${tx.amount >= 0 ? 'val-inc' : 'val-exp'}`}>
                      {formatCurrency(tx.amount)}
                    </span>
                    <button 
                      className="ledger-delete-action" 
                      onClick={() => handleDeleteRecord(tx.id)}
                      aria-label="Delete entry"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}