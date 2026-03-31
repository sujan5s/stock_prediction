import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Login failed');
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
      {/* Left Side: Immersive Visual */}
      <section className="auth-visual-section" style={{ flex: '0 0 50%', display: 'none' }}>
        <div className="auth-visual-bg">
          <img 
            className="auth-visual-img" 
            style={{ mixBlendMode: 'luminosity' }}
            src="/images/auth-login-bg.png" 
            alt="Futuristic trading terminal" 
          />
          <div className="login-visual-gradient" style={{ position: 'absolute', inset: 0 }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f131d, transparent)' }}></div>
        </div>

        <div className="auth-visual-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ width: '3rem', height: '2px', backgroundColor: '#c3f5ff' }}></span>
            <p className="auth-label text-primary" style={{ fontSize: '0.75rem' }}>
              The Kinetic Observatory
            </p>
          </div>
          <h1 className="auth-headline" style={{ fontSize: '4.5rem', fontWeight: 700, lineHeight: 0.9, marginBottom: '2rem' }}>
            Predicting <br/>
            <span className="text-primary" style={{ fontStyle: 'italic' }}>The Future</span> <br/>
            of Capital.
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#bac9cc', maxWidth: '28rem', lineHeight: 1.6 }}>
            Access institutional-grade AI intelligence and real-time market foresight within our deep-space digital environment.
          </p>
        </div>

        {/* Decorative Element */}
        <div className="auth-glass-panel auth-nebula-shadow" style={{ position: 'absolute', bottom: '3rem', right: '3rem', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'rgba(0, 229, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: '#00daf3' }}>trending_up</span>
            </div>
            <div>
              <p className="auth-label" style={{ fontSize: '0.625rem', color: '#bac9cc' }}>System Status</p>
              <p className="auth-headline text-primary-container" style={{ fontWeight: 700 }}>NODE-ACTIVE // 99.8%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <section className="auth-form-section">
        {/* Mobile Header Branding */}
        <div className="auth-headline text-primary" style={{ position: 'absolute', top: '3rem', fontSize: '1.5rem', fontWeight: 700, display: 'block' }}>
          StockAI
        </div>

        <div style={{ width: '100%', maxWidth: '420px', zIndex: 10 }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="auth-headline" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Welcome Back</h2>
            <p style={{ color: '#bac9cc' }}>Secure access to your terminal.</p>
          </div>

          <div className="auth-glass-panel auth-nebula-shadow" style={{ padding: '2.5rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {error && <div style={{ color: '#ffb4ab', backgroundColor: 'rgba(255, 180, 171, 0.1)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.875rem' }}>{error}</div>}
              
              {/* Email Field */}
              <div className="auth-input-container">
                <label htmlFor="email" className="auth-label" style={{ fontSize: '0.625rem', color: '#bac9cc', marginLeft: '0.25rem' }}>Email Identifier</label>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined auth-input-icon" style={{ fontSize: '1.25rem' }}>alternate_email</span>
                  <input 
                    id="email" 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="auth-input auth-input-with-icon" 
                    placeholder="name@nexus.com" 
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="auth-input-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.25rem' }}>
                  <label htmlFor="password" className="auth-label" style={{ fontSize: '0.625rem', color: '#bac9cc' }}>Encryption Key</label>
                  <Link to="#" className="auth-label auth-link" style={{ fontSize: '0.625rem' }}>Forgot?</Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined auth-input-icon" style={{ fontSize: '1.25rem' }}>lock</span>
                  <input 
                    id="password" 
                    type="password" 
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="auth-input auth-input-with-icon" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="auth-btn-primary" style={{ marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'AUTHENTICATING...' : 'LOG IN'} {!loading && <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_forward</span>}
              </button>
            </form>

            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(59, 73, 76, 0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#bac9cc' }}>Don't have credentials yet?</p>
              <Link to="/signup" className="auth-label auth-link" style={{ fontSize: '0.75rem' }}>Request Access</Link>
            </div>
          </div>

          <nav style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <Link to="#" className="auth-label text-primary" style={{ fontSize: '0.625rem', opacity: 0.5 }}>Privacy</Link>
            <Link to="#" className="auth-label text-primary" style={{ fontSize: '0.625rem', opacity: 0.5 }}>Terms</Link>
            <Link to="/dashboard" className="auth-label text-primary" style={{ fontSize: '0.625rem', opacity: 0.5 }}>Terminal</Link>
          </nav>
        </div>

        {/* Decorative AI watermark on large screens */}
        <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', opacity: 0.1, pointerEvents: 'none' }}>
           <div className="auth-headline" style={{ fontSize: '7.5rem', fontWeight: 900, color: '#313540', userSelect: 'none' }}>AI</div>
        </div>
      </section>

      {/* Global Footer anchor */}
      <footer style={{ position: 'fixed', bottom: '1rem', left: '1rem', zIndex: 50 }}>
        <p className="auth-label" style={{ fontSize: '0.5rem', color: 'rgba(186, 201, 204, 0.3)' }}>© 2024 StockAI. The Kinetic Observatory.</p>
      </footer>
    </main>
  )
}
