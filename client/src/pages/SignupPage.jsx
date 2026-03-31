import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

export default function SignupPage() {
  const [formData, setFormData] = useState({ full_name: '', work_email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.full_name,
          email: formData.work_email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Signup failed');
      }

      // Store token
      localStorage.setItem('token', data.token);
      
      // Move to Dashboard after successful sign up
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-root">
      {/* Left Side: Visual Experience */}
      <section className="auth-visual-section" style={{ flex: '0 0 60%', display: 'none' }}>
        {/* Background Visualization */}
        <div className="auth-visual-bg">
          <img 
            className="auth-visual-img" 
            style={{ mixBlendMode: 'screen', opacity: 0.4 }}
            src="/images/auth-signup-bg.png" 
            alt="Neural network visualization" 
          />
          <div className="signup-kinetic-gradient" style={{ position: 'absolute', inset: 0, opacity: 0.7 }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f131d, transparent)' }}></div>
        </div>

        {/* Content Overlay */}
        <div className="auth-visual-content" style={{ padding: '4rem', maxWidth: '42rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <span className="auth-headline text-primary-container" style={{ fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.05em' }}>
              StockAI
            </span>
            <span className="auth-label" style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(238, 193, 255, 0.1)', border: '1px solid rgba(238, 193, 255, 0.2)', color: '#eec1ff', fontSize: '0.625rem' }}>
              The Kinetic Observatory
            </span>
          </div>
          
          <h1 className="auth-headline text-primary" style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.05em' }}>
            Anticipate the <br/>
            <span style={{ color: 'white' }}>Invisible Pulse.</span>
          </h1>
          
          <p style={{ color: '#bac9cc', fontSize: '1.125rem', fontWeight: 300, lineHeight: 1.6, marginBottom: '3rem', maxWidth: '32rem' }}>
            Experience predictive intelligence that bridges the gap between raw data and actionable alpha. Join the next generation of institutional-grade trading.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '2rem', borderTop: '1px solid rgba(59, 73, 76, 0.15)', paddingTop: '2rem' }}>
            <div>
              <div className="auth-headline text-primary-container" style={{ fontSize: '1.5rem', fontWeight: 700 }}>99.8%</div>
              <div className="auth-label" style={{ fontSize: '0.75rem', color: 'rgba(186, 201, 204, 0.6)', marginTop: '0.25rem' }}>Uptime SLA</div>
            </div>
            <div>
              <div className="auth-headline" style={{ color: '#56ffa8', fontSize: '1.5rem', fontWeight: 700 }}>0.04ms</div>
              <div className="auth-label" style={{ fontSize: '0.75rem', color: 'rgba(186, 201, 204, 0.6)', marginTop: '0.25rem' }}>Latent Sync</div>
            </div>
          </div>
        </div>

        {/* Floating Decorations */}
        <div style={{ position: 'absolute', top: '25%', right: 0, width: '16rem', height: '16rem', background: 'rgba(0, 229, 255, 0.05)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
        <div style={{ position: 'absolute', bottom: '25%', left: 0, width: '24rem', height: '24rem', background: 'rgba(238, 193, 255, 0.05)', borderRadius: '50%', filter: 'blur(120px)' }}></div>
      </section>

      {/* Right Side: Registration Form */}
      <section className="auth-form-section" style={{ backgroundColor: '#0f131d' }}>
        
        {/* Mobile Header Branding */}
        <div className="auth-headline text-primary-container" style={{ alignSelf: 'flex-start', marginBottom: '3rem', fontSize: '1.5rem', fontWeight: 700, display: 'block' }}>
          StockAI
        </div>

        <div style={{ width: '100%', maxWidth: '28rem', zIndex: 10 }}>
          <header style={{ marginBottom: '2.5rem' }}>
            <h2 className="auth-headline" style={{ fontSize: '1.875rem', fontWeight: 700, color: '#dfe2f1', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>
              Initialize Account
            </h2>
            <p style={{ color: '#bac9cc' }}>Enter your credentials to access the terminal.</p>
          </header>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {error && <div style={{ color: '#ffb4ab', backgroundColor: 'rgba(255, 180, 171, 0.1)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.875rem' }}>{error}</div>}
            {/* Full Name */}
            <div className="auth-input-container">
              <label htmlFor="full_name" className="auth-label" style={{ fontSize: '0.75rem', color: 'rgba(186, 201, 204, 0.8)', marginLeft: '0.25rem', paddingBottom: '0.5rem' }}>Full Name</label>
              <input 
                id="full_name" 
                type="text" 
                required
                value={formData.full_name}
                onChange={handleChange}
                className="auth-input" 
                placeholder="Elias Thorne"
                style={{ padding: '1rem 1.25rem', backgroundColor: '#313540', borderRadius: '12px' }} 
              />
            </div>

            {/* Work Email */}
            <div className="auth-input-container">
              <label htmlFor="work_email" className="auth-label" style={{ fontSize: '0.75rem', color: 'rgba(186, 201, 204, 0.8)', marginLeft: '0.25rem', paddingBottom: '0.5rem' }}>Work Email</label>
              <input 
                id="work_email" 
                type="email" 
                required
                value={formData.work_email}
                onChange={handleChange}
                className="auth-input" 
                placeholder="e.thorne@quant.capital"
                style={{ padding: '1rem 1.25rem', backgroundColor: '#313540', borderRadius: '12px' }} 
              />
            </div>

            {/* Password */}
            <div className="auth-input-container">
              <label htmlFor="password" className="auth-label" style={{ fontSize: '0.75rem', color: 'rgba(186, 201, 204, 0.8)', marginLeft: '0.25rem', paddingBottom: '0.5rem' }}>Password</label>
              <input 
                id="password" 
                type="password" 
                required
                value={formData.password}
                onChange={handleChange}
                className="auth-input" 
                placeholder="••••••••••••"
                style={{ padding: '1rem 1.25rem', backgroundColor: '#313540', borderRadius: '12px' }} 
              />
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="auth-btn-primary" style={{ marginTop: '1rem', padding: '1rem', borderRadius: '9999px', display: 'flex', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
              <span style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center' }}>
                {loading ? 'Initializing...' : 'Create Account'}
                {!loading && <span className="material-symbols-outlined" style={{ marginLeft: '0.5rem', fontSize: '1.25rem' }}>arrow_forward</span>}
              </span>
            </button>
          </form>

          {/* Footer Actions */}
          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '0.875rem', color: '#bac9cc', display: 'flex', alignItems: 'center' }}>
              Already have access?
              <Link to="/login" className="auth-link" style={{ marginLeft: '0.5rem', fontWeight: 500 }}>Log in instead</Link>
            </div>

            <div style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '1rem 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(59, 73, 76, 0.15)' }}></div>
              <span className="auth-label" style={{ padding: '0 1rem', fontSize: '0.625rem', color: 'rgba(186, 201, 204, 0.4)' }}>
                Secured with Quantum 256
              </span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(59, 73, 76, 0.15)' }}></div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(186, 201, 204, 0.6)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>language</span>
                <span className="auth-label" style={{ fontSize: '0.75rem' }}>EN-US</span>
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(186, 201, 204, 0.6)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>support</span>
                <span className="auth-label" style={{ fontSize: '0.75rem' }}>Support</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer anchor */}
      <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 20, pointerEvents: 'none', display: 'none' }}>
        <p className="auth-label" style={{ fontSize: '0.625rem', color: 'rgba(186, 201, 204, 0.2)' }}>
            © 2024 StockAI. The Kinetic Observatory.
        </p>
      </div>
    </main>
  )
}
