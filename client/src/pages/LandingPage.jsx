import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className="landing-root">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#c3f5ff', fontFamily: 'Space Grotesk' }}>
            StockAI
          </div>
          <div className="nav-links" style={{ display: 'none' }}>
             {/* Hidden on mobile, inline styles to hide simply for now */}
          </div>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/dashboard" className="active">Markets</Link>
            <Link to="/dashboard">Predictions</Link>
            <Link to="/dashboard">Intelligence</Link>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/login" style={{ background: 'none', border: 'none', color: '#dfe2f1', cursor: 'pointer', fontWeight: 500, textDecoration: 'none' }}>
              Login
            </Link>
            <Link to="/signup" style={{
              background: '#00e5ff', color: '#00363d', padding: '0.6rem 1.5rem', 
              borderRadius: '9999px', fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 0 20px rgba(0,229,255,0.3)'
            }}>
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section: The Kinetic Observatory */}
      <section className="hero-section">
        {/* Background Visualization */}
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <img 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt="futuristic 3D visualization" 
            src="/images/hero-viz.png" 
          />
        </div>

        <div className="hero-content">
          <div className="glass-surface" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '9999px', marginBottom: '1.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00e5ff', marginRight: '8px', animation: 'pulse-dot 2s infinite' }}></span>
            <span className="landing-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#c3f5ff' }}>
              Live Market Intelligence
            </span>
          </div>
          <h1 className="landing-headline title-text" style={{ fontSize: '5rem', fontWeight: 700, lineHeight: 0.9, marginBottom: '2rem' }}>
            <span style={{ color: '#c3f5ff' }}>The Future of</span><br/>
            <span style={{ 
              color: 'transparent', 
              backgroundImage: 'linear-gradient(to right, #c3f5ff, #56ffa8)', 
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text'
            }}>Market Intelligence</span>
          </h1>
          <p style={{ maxWidth: '42rem', margin: '0 auto 3rem', fontSize: '1.25rem', color: '#bac9cc', fontWeight: 300, lineHeight: 1.6 }}>
            Leverage neural architectures and real-time quantum analytics to predict market movements with institutional precision.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/signup" className="btn-primary" style={{ textDecoration: 'none' }}>
              Sign Up for Free
            </Link>
            <Link to="/dashboard" className="btn-ghost">
              View Terminal
            </Link>
          </div>
        </div>

        {/* Floating Elements (Hidden on smaller screens, simplified) */}
        <div className="glass-surface nebula-shadow" style={{ position: 'absolute', top: '25%', left: '5%', padding: '1rem', borderRadius: '8px', transform: 'rotate(-5deg)', display: 'none' }}>
           <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', fontFamily: 'Space Grotesk' }}>$NVDA +12.4%</div>
        </div>
      </section>

      {/* Features: Bento Grid */}
      <section className="features-section">
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="col-8 feature-card glass-surface nebula-shadow group">
            <span className="landing-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#c3f5ff', marginBottom: '1rem' }}>
              Core Technology
            </span>
            <h3 className="landing-headline" style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white', marginBottom: '1.5rem' }}>
              AI Neural Engine
            </h3>
            <p style={{ color: '#bac9cc', fontSize: '1.125rem', lineHeight: 1.6, maxWidth: '32rem' }}>
              Our proprietary neural network processes over 14 petabytes of global market data every second, identifying patterns invisible to human analysts and traditional algorithms.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '3rem' }}>
               <div style={{ height: '4px', width: '6rem', backgroundColor: '#c3f5ff', borderRadius: '9999px' }}></div>
            </div>
            {/* Icon */}
            <span className="material-symbols-outlined" style={{ position: 'absolute', top: 0, right: 0, fontSize: '140px', color: '#c3f5ff', opacity: 0.1, padding: '2rem' }}>
              neurology
            </span>
          </div>

          {/* Feature 2 */}
          <div className="col-4 feature-card glass-surface nebula-shadow">
            <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'rgba(195, 245, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
               <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#c3f5ff' }}>bolt</span>
            </div>
            <h3 className="landing-headline" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>
              Real-time Analytics
            </h3>
            <p style={{ color: '#bac9cc', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Zero-latency streaming of predictive insights. React to market shifts before they happen with our millisecond-speed processing.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="col-4 feature-card nebula-shadow" style={{ border: '1px solid rgba(59, 73, 76, 0.15)', background: '#171b26' }}>
            <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'rgba(238, 193, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
               <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#eec1ff' }}>verified_user</span>
            </div>
            <h3 className="landing-headline" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>
              Institutional Accuracy
            </h3>
            <p style={{ color: '#bac9cc', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Back-tested against 20 years of market history. Trusted by top-tier hedge funds and individual high-net-worth investors globally.
            </p>
          </div>

          {/* Feature 4: Terminal Canvas */}
          <div className="col-8 feature-card nebula-shadow" style={{ minHeight: '300px', padding: 0, justifyContent: 'flex-end', background: '#313540' }}>
            <img 
              src="/images/terminal-canvas.png" 
              alt="terminal canvas" 
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f131d, transparent)' }}></div>
            <div style={{ position: 'relative', zIndex: 10, padding: '2.5rem' }}>
               <h3 className="landing-headline" style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                 Omni-Terminal Interface
               </h3>
               <p style={{ color: '#bac9cc', maxWidth: '28rem' }}>The most advanced visualization tool for predictive data ever built.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Data Section */}
      <section style={{ padding: '6rem 1.5rem', background: '#171b26' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
             <h2 className="landing-headline" style={{ fontSize: '3.5rem', fontWeight: 700, color: '#c3f5ff', lineHeight: 1.1, marginBottom: '2rem' }}>
               The Observatory in <br/> Action.
             </h2>
             <p style={{ color: '#bac9cc', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: 1.6 }}>
               We don't just guess. We observe the kinetic movement of capital across every asset class—equities, crypto, and derivatives—to synthesize a singular truth.
             </p>
             <div className="glass-surface" style={{ padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(22, 255, 158, 0.1)', color: '#56ffa8', borderRadius: '4px' }}>
                  <span className="material-symbols-outlined">monitoring</span>
                </div>
                <div style={{ flex: 1 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                     <span className="landing-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#dfe2f1' }}>Predictive Confidence</span>
                     <span className="landing-label" style={{ fontSize: '0.75rem', color: '#c3f5ff' }}>94.8%</span>
                   </div>
                   <div style={{ width: '100%', height: '4px', background: '#313540', borderRadius: '9999px' }}>
                     <div style={{ height: '100%', width: '94.8%', background: '#c3f5ff', borderRadius: '9999px' }}></div>
                   </div>
                </div>
             </div>
          </div>
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
             <div className="nebula-shadow" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(59, 73, 76, 0.15)' }}>
               <img src="/images/observatory-action.png" alt="data flow" style={{ width: '100%', height: 'auto', display: 'block' }} />
             </div>
             <div className="glass-surface nebula-shadow" style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', padding: '1.5rem', borderRadius: '8px' }}>
               <div className="landing-label" style={{ fontSize: '0.625rem', textTransform: 'uppercase', color: '#c3f5ff', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                 Market Sentiment
               </div>
               <div className="landing-headline" style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>
                 Aggressive Bull
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem 1.5rem', borderTop: '1px solid rgba(59, 73, 76, 0.15)', background: '#0f131d', marginTop: '5rem' }}>
         <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
           <div>
             <div className="landing-headline" style={{ fontSize: '1.125rem', fontWeight: 700, color: '#c3f5ff', marginBottom: '0.5rem' }}>StockAI</div>
             <p className="landing-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(223, 226, 241, 0.5)' }}>
               © 2024 StockAI. The Kinetic Observatory.
             </p>
           </div>
           <div className="landing-label" style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
             <span style={{ color: 'rgba(223, 226, 241, 0.5)', cursor: 'pointer' }}>Privacy</span>
             <span style={{ color: 'rgba(223, 226, 241, 0.5)', cursor: 'pointer' }}>Terms</span>
             <span style={{ color: 'rgba(223, 226, 241, 0.5)', cursor: 'pointer' }}>Security</span>
             <Link to="/dashboard" style={{ color: '#00e5ff', textDecoration: 'none' }}>Terminal</Link>
           </div>
         </div>
      </footer>
    </div>
  )
}
