import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TrendingDown, Target, ShieldCheck, Zap } from 'lucide-react';
import './Insights.css';

export default function Insights() {
  const pageRef = useRef();
  const [ledger, setLedger] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState({
    predicted_savings: 0,
    confidence_score: 0,
    advisory_notes: []
  });

  const fetchPrediction = async (transactions) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactions })
      });
      if (response.ok) {
        const data = await response.json();
        setInsights(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  

  useEffect(() => {
    const savedData = localStorage.getItem('transactions');
    if (savedData) {
      try { 
        const parsedData = JSON.parse(savedData);
        setLedger(parsedData);
        fetchPrediction(parsedData);
      } catch(e) { 
        console.error(e); 
      }
    }
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".insights-hero-text", {
      y: -30,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out"
    })
    .from(".left-terminal", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .from(".stream-node", {
      x: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=0.6");
  }, { scope: pageRef });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
  };

  const getNodeClass = (index) => {
    const classes = ["warning", "success", "safety"];
    return classes[index % classes.length];
  };

  const getNodeIcon = (index) => {
    if (index % 3 === 0) return <Zap size={14} />;
    if (index % 3 === 1) return <Target size={14} />;
    return <ShieldCheck size={14} />;
  };

  return (
    <div ref={pageRef} className="insights-page">
      <div className="insights-container">
        
        <header className="insights-hero-text">
          <h1>Insights And Optimization</h1>
          <p>Our model runs projection layers over your data matrix to balance future costs.</p>
        </header>

        <div className="insights-split-layout">
          
          <div className="left-terminal">
            <div className="glass-card projection-master-card">
              <span className="card-tag">Neural Net Horizon (30d)</span>
              <h3>Forecasted Balance</h3>
              <div className="predicted-value-wrapper">
                <span className="pred-amount">
                  {isAnalyzing ? "Processing..." : formatCurrency(insights.predicted_savings)}
                </span>
                <span className="pred-confidence">{insights.confidence_score}% Confidence</span>
              </div>
              <p className="nn-meta">
                Calculated by searching through {ledger.length} active historical vector nodes inside your browser storage sandbox.
              </p>
            </div>

            <div className="matrix-stats-grid">
              <div className="glass-card compact-stat-card">
                <div className="stat-icon-wrapper"><TrendingDown size={18} /></div>
                <div>
                  <h4>Optimized Spend target</h4>
                  <p>{isAnalyzing ? "..." : formatCurrency(insights.predicted_savings * 0.82)}</p>
                </div>
              </div>
              
              <div className="glass-card compact-stat-card">
                <div className="stat-icon-wrapper"><Target size={18} /></div>
                <div>
                  <h4>Model Efficiency</h4>
                  <p>+14.6% Deflection</p>
                </div>
              </div>
            </div>
          </div>

          <div className="right-consult-stream">
            <h3 className="stream-heading">LLM Advisory Stream</h3>
            
            <div className="stream-timeline">
              {isAnalyzing ? (
                <p>Generating real-time advisory notes...</p>
              ) : insights.advisory_notes.length > 0 ? (
                insights.advisory_notes.map((note, index) => (
                  <div key={index} className={`stream-node ${getNodeClass(index)}`}>
                    <div className="node-indicator">{getNodeIcon(index)}</div>
                    <div className="glass-card node-card">
                      <h5>Advice {index + 1}</h5>
                      <p>{note}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Add more transactions to generate AI insights.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}