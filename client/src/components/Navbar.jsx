import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([])
  const notifRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        const res = await fetch('http://localhost:5000/api/auth/user', {
          headers: { 'Authorization': "Bearer " + token } // Note: Fixed Bearer token interpolation issue
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
    
    // Generate daily dynamic notifications
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    setNotifications([
      { id: 1, title: 'Daily AI Update Ready', message: `Your AI models have successfully processed the latest market data for ${today}. Check the Dashboard to view tomorrow's forecast!`, time: '10m ago', unread: true },
      { id: 2, title: 'Volatility Alert', message: `High volatility detected in NIFTY 50 based on yesterday's close. Stay alert on sudden swings.`, time: '2h ago', unread: true },
      { id: 3, title: 'Welcome to StockAI', message: 'Your personalized trading models have been calibrated.', time: '1d ago', unread: false }
    ])

  }, [])

  // Close notifications if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [notifRef])

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Project Details', path: '/project-details' },
    { label: 'About Us', path: '/about' }
  ]

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const unreadCount = notifications.filter(n => n.unread).length

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
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  style={{ 
                    color: isActive ? '#00E5FF' : '#dfe2f1', 
                    borderBottom: isActive ? '2px solid #00E5FF' : 'none', 
                    paddingBottom: '4px',
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#c3f5ff' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#dfe2f1' }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            {/* Notification Wrapper */}
            <div style={{ position: 'relative' }} ref={notifRef}>
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ 
                  padding: '8px', color: '#dfe2f1', borderRadius: '50%', 
                  transition: 'all 0.2s', background: showNotifications ? 'rgba(0,229,255,0.1)' : 'transparent', 
                  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                onMouseEnter={e => (!showNotifications && (e.currentTarget.style.background = 'rgba(49,53,64,0.5)'))}
                onMouseLeave={e => (!showNotifications && (e.currentTarget.style.background = 'transparent'))}
              >
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '0', right: '0', background: '#ff3b30', color: '#fff',
                    borderRadius: '50%', fontSize: '10px', fontWeight: 'bold', width: '18px', height: '18px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 5px rgba(255,59,48,0.5)'
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div style={{
                  position: 'absolute', top: '120%', right: '0', width: '350px',
                  background: '#1c1f2a', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  zIndex: 9999, overflow: 'hidden', display: 'flex', flexDirection: 'column'
                }}>
                  <div style={{ 
                    padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'rgba(255,255,255,0.02)'
                  }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: 0 }}>Notifications</h3>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} style={{ 
                        fontSize: '12px', color: '#00E5FF', background: 'transparent', 
                        border: 'none', cursor: 'pointer', padding: 0 
                      }}>
                        Mark all as read
                      </button>
                    )}
                  </div>
                  
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: '24px', textAlign: 'center', color: '#bac9cc', fontSize: '13px' }}>
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div key={notif.id} style={{ 
                          padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)',
                          background: notif.unread ? 'rgba(0,229,255,0.03)' : 'transparent',
                          display: 'flex', gap: '12px', transition: 'background 0.2s', cursor: 'default'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = notif.unread ? 'rgba(0,229,255,0.03)' : 'transparent' }}
                        >
                          <div style={{ 
                            width: '8px', height: '8px', borderRadius: '50%', 
                            background: notif.unread ? '#00E5FF' : 'transparent', 
                            marginTop: '6px', flexShrink: 0 
                          }} />
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: notif.unread ? '#fff' : '#dfe2f1' }}>{notif.title}</h4>
                              <span style={{ fontSize: '11px', color: '#849396', whiteSpace: 'nowrap', marginLeft: '8px' }}>{notif.time}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '12px', color: '#bac9cc', lineHeight: '1.4' }}>{notif.message}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div style={{ 
                    padding: '8px', textAlign: 'center', background: 'rgba(255,255,255,0.02)',
                    borderTop: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    <button style={{ 
                      background: 'transparent', border: 'none', color: '#bac9cc', 
                      fontSize: '12px', cursor: 'pointer' 
                    }}>View All Settings</button>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar Link */}
            <Link
              to="/profile"
              style={{
                height: '40px', width: '40px', borderRadius: '50%',
                border: '2px solid #00E5FF', overflow: 'hidden',
                boxShadow: '0 0 15px rgba(0,229,255,0.3)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg,#00daf3,#006875)', color: '#001f24',
                fontWeight: 700, fontSize: '14px', textDecoration: 'none'
              }}
            >
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
