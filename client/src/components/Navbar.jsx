import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [search, setSearch] = useState('')

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

          {/* Avatar */}
          <div
            style={{
              height: '40px',
              width: '40px',
              borderRadius: '9999px',
              border: '2px solid #00E5FF',
              overflow: 'hidden',
              boxShadow: '0 0 15px rgba(0,229,255,0.3)',
            }}
          >
            <img
              src="/images/avatar.png"
              alt="User Avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;background:linear-gradient(135deg,#00daf3,#006875);color:#001f24">SJ</div>'
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
