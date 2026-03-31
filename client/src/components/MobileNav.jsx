import React from 'react'

const mobileLinks = [
  { icon: 'home', label: 'Home', active: true },
  { icon: 'insights', label: 'Charts' },
  { icon: 'smart_toy', label: 'AI' },
  { icon: 'person', label: 'Profile' },
]

export default function MobileNav() {
  return (
    <nav className="app-mobile-nav">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '16px 24px 32px',
          background: 'linear-gradient(to top, rgba(0,229,255,0.05), transparent)',
        }}
      >
        {mobileLinks.map(link =>
          link.active ? (
            <a
              key={link.label}
              href="#"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#00E5FF',
                color: '#0f131d',
                borderRadius: '9999px',
                padding: '12px',
                boxShadow: '0 0 20px rgba(0,229,255,0.4)',
                transform: 'scale(0.9)',
                transition: 'transform 0.2s',
              }}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>
                {link.label}
              </span>
            </a>
          ) : (
            <a
              key={link.label}
              href="#"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(223,226,241,0.5)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c3f5ff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(223,226,241,0.5)')}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>
                {link.label}
              </span>
            </a>
          )
        )}
      </div>
    </nav>
  )
}
