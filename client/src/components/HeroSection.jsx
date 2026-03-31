import React, { useState, useEffect } from 'react'

export default function HeroSection() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        const res = await fetch('http://localhost:5000/api/auth/user', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setUser(data)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchUser()
  }, [])

  return (
    <section
      style={{
        marginBottom: '48px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
        padding: '32px',
        background: '#171b26',
      }}
    >
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '640px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '16px',
            background: 'rgba(238,193,255,0.15)',
            color: '#8a1ebd',
          }}
        >
          Neural Engine v4.2 Active
        </span>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 700,
            marginBottom: '16px',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontFamily: 'Space Grotesk, sans-serif',
            color: '#c3f5ff',
          }}
        >
          Welcome Back, {user ? user.fullName.split(' ')[0] : 'Trader'}
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '32px', color: '#bac9cc', fontFamily: 'Inter, sans-serif' }}>
          Access your personalized dashboard. Predict tomorrow's price with high-fidelity machine learning models trained on decades of market volatility.
        </p>
        <button
          style={{
            padding: '16px 32px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '1.125rem',
            background: '#c3f5ff',
            color: '#00363d',
            fontFamily: 'Space Grotesk, sans-serif',
            transition: 'box-shadow 0.3s',
            boxShadow: '0 0 20px rgba(0,229,255,0.2)',
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(0,229,255,0.5)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,255,0.2)')}
        >
          Analyze Now
        </button>
      </div>

      {/* Decorative Abstract Element */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '50%',
          height: '100%',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            background: 'linear-gradient(to left, rgba(0,229,255,0.2), transparent)',
          }}
        />
        <img
          src="/images/hero-bg.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => (e.currentTarget.style.display = 'none')}
        />
        {/* Fallback: SVG network visualization */}
        <svg
          className="float-animation"
          viewBox="0 0 600 400"
          fill="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          {[50, 100, 150, 200, 250, 300, 350].map(y => (
            <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#00daf3" strokeOpacity="0.1" strokeWidth="1" />
          ))}
          {[100, 200, 300, 400, 500].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="#00daf3" strokeOpacity="0.1" strokeWidth="1" />
          ))}
          {[
            [100, 100], [100, 200], [100, 300],
            [250, 80], [250, 180], [250, 280], [250, 380],
            [400, 120], [400, 250], [400, 350],
            [550, 200],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="8" fill="#00daf3" fillOpacity="0.6"
              style={{ filter: 'drop-shadow(0 0 6px rgba(0,229,255,0.8))' }}
            />
          ))}
          {[
            [100, 100, 250, 80], [100, 100, 250, 180],
            [100, 200, 250, 180], [100, 200, 250, 280],
            [100, 300, 250, 280], [100, 300, 250, 380],
            [250, 80, 400, 120], [250, 180, 400, 120],
            [250, 180, 400, 250], [250, 280, 400, 250],
            [250, 280, 400, 350], [250, 380, 400, 350],
            [400, 120, 550, 200], [400, 250, 550, 200], [400, 350, 550, 200],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00daf3" strokeOpacity="0.2" strokeWidth="1" />
          ))}
          <path
            className="chart-line"
            d="M0,320 Q80,280 160,240 T320,200 T480,140 T600,100"
            stroke="#00e5ff"
            strokeWidth="3"
            fill="none"
            style={{ filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.8))' }}
          />
        </svg>
      </div>
    </section>
  )
}
