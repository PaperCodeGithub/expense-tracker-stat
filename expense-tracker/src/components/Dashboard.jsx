import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaTrash } from 'react-icons/fa';
import './Dashboard.css';

import SphereBackground from './SphereBackground';

export default function Dashboard() {
  const dashRef = useRef();

  const [typeToggle, setTypeToggle] = useState('expense');
  const [transactions, setTransactions] = useState([]);
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  useGSAP(() => {
    gsap.from(".glass-card", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    });
  }, { scope: dashRef });

  const getFormattedTime = () => {
    const now = new Date();
    return now.toLocaleString('en-IN', {
      month: 'short',   
      day: 'numeric',   
      hour: '2-digit',  
      minute: '2-digit',
      hour12: true      
    });
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
    
    if (!description.trim() || !amount) return;

    const finalAmount = typeToggle === 'expense' ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount));
    
    const newTransaction = {
      id: Date.now(),
      name: description,
      time: getFormattedTime(),
      amount: finalAmount
    };

    setTransactions([newTransaction, ...transactions]);

    setDescription('');
    setAmount('');
  }

  const onIncomeClick = (e) => {
    e.preventDefault();
    if(typeToggle === 'income') return;
    setTypeToggle('income');
    setAmount(Math.abs(amount));
  }

  const onExpenseClick = (e) => {
    e.preventDefault();
    if(typeToggle === 'expense') return;
    setTypeToggle('expense');
    setAmount(Math.abs(amount) - Math.abs(amount * 2));
  }

  const formatCurrency = (value) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(Math.abs(value));
    
    return value >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const onSaveClick = () => {
    if (transactions.length === 0) {
      return;
    }

    try {
      setIsSaving(true);
      localStorage.setItem('transactions', JSON.stringify(transactions));
      alert('Transactions saved locally!');
    } catch (error) {
      console.error('Error saving transactions:', error);
      alert('Failed to save transactions.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div ref={dashRef} className="dashboard-page">
      <SphereBackground />
      <div className="dashboard-grid">        
        <div className="glass-card header-card">
          <h2 className="balance-title">Total Balance</h2>
          <p className="balance-amount">{formatCurrency(totalBalance)}</p>
        </div>

        <div className="glass-card form-card">
          <h3 className="card-title">Add Transaction</h3>
          <div className="form-group">
            <div className="type-toggle">
              {typeToggle === 'income' ? (
                <button className="income-btn active" onClick={onIncomeClick}>
                  Income
                </button>
              ) : (
                <button className="income-btn" onClick={onIncomeClick}>
                  Income
                </button>
              )}
              {typeToggle === 'expense' ? (
                <button className="expense-btn active" onClick={onExpenseClick}>
                  Expense
                </button>
              ) : (
                <button className="expense-btn" onClick={onExpenseClick}>
                  Expense
                </button>
              )}
            </div>
            <input 
              type="text" 
              placeholder="Description" 
              className="form-input" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input 
              type="number" 
              placeholder="Amount" 
              className="form-input" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="submit-btn" onClick={handleAddRecord}>
              Add Record
            </button>
          </div>
          <div className="save-section">
            <button className="save-btn" onClick={onSaveClick} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <p>This transactions will be saved locally, We are not collecting any data.</p>
          </div>
        </div>

        <div className="glass-card transactions-card">
          <h3 className="card-title">Recent Activity</h3>
          <div className="transaction-list">

            {transactions.map((item) => (
              <div key={item.id} className="transaction-item">
                <div className="tx-info">
                  <div className="tx-icon">❖</div>
                  <div>
                    <p className="tx-name">{item.name}</p>
                    <p className="tx-date">{item.time}</p>
                  </div>
                </div>
                <p className="tx-amount" style={{ color: item.amount >= 0 ? '#000' : '#888' }}>
                  {formatCurrency(item.amount)}
                </p>
                <p>
                  <FaTrash className="delete-icon" onClick={() => setTransactions(transactions.filter(tx => tx.id !== item.id))} />
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}