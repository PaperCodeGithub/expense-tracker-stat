import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ThreeBackground from './ThreeBackground';
import './Welcome.css';

gsap.registerPlugin(ScrollTrigger);

export default function Welcome() {
  const pageWrapper = useRef();
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".hero-text", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.2
    })
    .from(".hero-btn", {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.5)"
    }, "-=0.5");

    gsap.from(".featured-header-content", {
      scrollTrigger: {
        trigger: ".featured-section",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".feature-grid",
        start: "top 85%", 
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out"
    });

    gsap.to(".timeline-line-fill", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".process-timeline",
        start: "top center",
        end: "bottom center",
        scrub: true 
      }
    });
  
    const steps = gsap.utils.toArray('.process-step');
    steps.forEach((step) => {
      const isLeft = step.classList.contains('left');
      
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
        },
        x: isLeft ? -60 : 60, 
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

    gsap.from(".modern-footer", {
      scrollTrigger: {
        trigger: ".modern-footer",
        start: "top 95%", 
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });

  }, { scope: pageWrapper });

  return (
    <div ref={pageWrapper} className="page-wrapper">
      <div className="welcome-container">
        <ThreeBackground className="3d-background"/>
        <div className="overlay">
          <div className="welcome-content">
            <h1 className="hero-text hero-title">
              Absolute Precision<br/>
              by<br />
              <span>Statistical Modeling</span>
            </h1>
            
            <p className="hero-text hero-subtitle">
              Track your expenses like never before with our statistical modeling. Experience unparalleled insights and control over your finances.
            </p>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="hero-btn">
              Get Started
            </button>
          </div>
        </div>   
      </div>

      <div className="feature-background-wrapper">
        <div className="glass-blob blob-blue"></div>
        <div className="glass-blob blob-purple"></div>
        <div className="featured-section">
          <div className="featured-header">
            <h2 className="featured-header-content section-title">
              Why Choose FinTrack?
            </h2>
            <p className="featured-header-content section-subtitle">
              Experience the future of expense tracking. Our advanced algorithms provide accurate, actionable insights to help you achieve your financial goals.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>Unparalleled Accuracy</h3>
              <p>Our models are trained on vast datasets to identify spending trends and predict future expenses with pinpoint precision.</p>
            </div>
            
            <div className="feature-card">
              <h3>Robust Security</h3>
              <p>Trust that your financial data is safe. We utilize cutting-edge technology and customizable features to protect your information.</p>
            </div>
            
            <div className="feature-card">
              <h3>Actionable Insights</h3>
              <p>Whether you're looking to save money, budget effectively, or simply understand your spending better, we have you covered.</p>
            </div>
          </div>
        </div>
      </div>    
      
      <div className="how-it-works-wrapper">
        <div className="how-it-works-header">
          <h2 className="section-title">The Process</h2>
          <p className="section-subtitle">
            From raw data to actionable financial intelligence in three seamless steps.
          </p>
        </div>

        <div className="process-timeline">
          <div className="timeline-line-bg">
            <div className="timeline-line-fill"></div>
          </div>

          
          <div className="process-step left">
            <div className="timeline-node"></div>
            <div className="process-content">
              <div className="process-watermark">01</div>
              <h3>Data Aggregation</h3>
              <p>Input your financial data. We securely gather and organize your historical spending patterns in real-time.</p>
            </div>
          </div>

          
          <div className="process-step right">
            <div className="timeline-node"></div>
            <div className="process-content">
              <div className="process-watermark">02</div>
              <h3>Deep Neural Net</h3>
              <p>Your data is processed through our advanced Deep Neural Network, which identifies hidden trends to accurately predict your future expenses.</p>
            </div>
          </div>

          
          <div className="process-step left">
            <div className="timeline-node"></div>
            <div className="process-content">
              <div className="process-watermark">03</div>
              <h3>LLM Optimization</h3>
              <p>Our integrated LLM acts as your personal financial advisor, instantly suggesting which costs to minimize to maximize your savings.</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="modern-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h2><span>FIN</span><span style={{ color: '#c4b5fd' }}>TRACK</span></h2>
            <p>Elevating financial tracking through statistical modeling and artificial intelligence.</p>
          </div>

          <div className="footer-socials">
            
            <a href="#" target="_blank" rel="noreferrer" aria-label="Instagram" className="insta">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            
            <a href="#" target="_blank" rel="noreferrer" aria-label="GitHub" className="github">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>

            
            <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="linkedin">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} FINTRACK. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}