import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

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

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav className="app-navbar">
      <div className="app-navbar-inner">
        {/* Logo + Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link
            to="/"
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              fontFamily: 'Space Grotesk, sans-serif',
              color: '#c3f5ff',
              filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.5))',
              textDecoration: 'none',
            }}
          >
            StockAI
          </Link>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              fontSize: '14px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            <a href="#" style={{ color: '#00E5FF', borderBottom: '2px solid #00E5FF', paddingBottom: '4px' }}>
              Dashboard
            </a>
            {['Predictions', 'Markets', 'AI Insights'].map((link) => (
              <a
                key={link}
                href="#"
                style={{ color: '#dfe2f1', transition: 'color 0.3s', padding: '0 8px' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c3f5ff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#dfe2f1')}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Search + Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Search Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              borderRadius: '9999px',
              border: '1px solid rgba(59,73,76,0.15)',
              background: 'rgba(49,53,64,0.4)',
            }}
          >
            <span className="material-symbols-outlined" style={{ color: '#bac9cc', fontSize: '20px', marginRight: '8px' }}>
              search
            </span>
            <input
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '14px',
                width: '192px',
                color: '#dfe2f1',
              }}
              placeholder="Search RELIANCE, BTC, TSLA..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Notifications */}
          <button
            style={{ padding: '8px', color: '#dfe2f1', borderRadius: '9999px', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(49,53,64,0.5)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>

{/* Avatar Link */}
          <Link
            to="/profile"
            style={{
              height: '40px',
              width: '40px',
              borderRadius: '9999px',
              border: '2px solid #00E5FF',
              overflow: 'hidden',
              boxShadow: '0 0 15px rgba(0,229,255,0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg,#00daf3,#006875)',
              color: '#001f24',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            {user ? user.fullName.charAt(0).toUpperCase() : 'U'}
          </Link>
        </div>
      </div>
    </nav>
  )
}
