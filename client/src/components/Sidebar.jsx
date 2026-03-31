import React from 'react'
import { useNavigate } from 'react-router-dom'

const navLinks = [
  { icon: 'dashboard', label: 'Dashboard', active: true },
  { icon: 'query_stats', label: 'Predictions' },
  { icon: 'show_chart', label: 'Markets' },
  { icon: 'account_balance_wallet', label: 'Portfolio' },
  { icon: 'psychology', label: 'AI Insights' },
]

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <aside className="app-sidebar">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'auto' }}>
        {navLinks.map((link) =>
          link.active ? (
            <a
              key={link.label}
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                fontWeight: 700,
                color: '#00E5FF',
                borderRight: '4px solid #00E5FF',
                background: 'linear-gradient(to right, rgba(0,229,255,0.1), transparent)',
              }}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              {link.label}
            </a>
          ) : (
            <a
              key={link.label}
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                color: 'rgba(223,226,241,0.6)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#dfe2f1'
                e.currentTarget.style.background = '#171b26'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(223,226,241,0.6)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              {link.label}
            </a>
          )
        )}
      </div>

      

      {/* Footer Links */}
      <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid rgba(59,73,76,0.3)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 16px',
            borderRadius: '12px',
            color: 'rgba(223,226,241,0.6)',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#dfe2f1')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(223,226,241,0.6)')}
        >
          <span className="material-symbols-outlined">help</span> Support
        </a>
        <a
          href="#"
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 16px',
            borderRadius: '12px',
            color: 'rgba(223,226,241,0.6)',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#ffb4ab')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(223,226,241,0.6)')}
        >
          <span className="material-symbols-outlined">logout</span> Logout
        </a>
      </div>
    </aside>
  )
}
