import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      try {
        const res = await fetch('http://localhost:5000/api/auth/user', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setUser(data)
        } else {
          // Token might be invalid
          localStorage.removeItem('token')
          navigate('/login')
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main className="app-main" style={{ display: 'flex', flexDirection: 'column', padding: '2rem', gap: '2rem' }}>
          <h1 style={{ fontSize: '2rem', color: '#c3f5ff', fontWeight: 'bold' }}>My Profile</h1>

          {loading ? (
            <div style={{ color: '#bac9cc' }}>Loading profile...</div>
          ) : user ? (
            <div style={{
              background: '#171b26',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid rgba(59,73,76,0.5)',
              maxWidth: '600px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                <div style={{
                  height: '80px',
                  width: '80px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #00daf3, #006875)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#001f24',
                  boxShadow: '0 0 20px rgba(0,229,255,0.3)'
                }}>
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '0.25rem' }}>{user.fullName}</h2>
                  <p style={{ color: '#bac9cc', fontSize: '1rem' }}>{user.email}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid rgba(59,73,76,0.3)', paddingTop: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#bac9cc', marginBottom: '0.5rem' }}>Full Name</label>
                  <div style={{ padding: '0.75rem', background: '#0f131d', borderRadius: '8px', color: '#ffffff', border: '1px solid rgba(59,73,76,0.3)' }}>
                    {user.fullName}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#bac9cc', marginBottom: '0.5rem' }}>Email Address</label>
                  <div style={{ padding: '0.75rem', background: '#0f131d', borderRadius: '8px', color: '#ffffff', border: '1px solid rgba(59,73,76,0.3)' }}>
                    {user.email}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(59,73,76,0.3)' }}>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'rgba(255, 180, 171, 0.1)',
                    color: '#ffb4ab',
                    border: '1px solid rgba(255, 180, 171, 0.3)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 180, 171, 0.2)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 180, 171, 0.1)' }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div style={{ color: '#ffb4ab' }}>Failed to load profile data.</div>
          )}
        </main>
      </div>

      <MobileNav />
    </div>
  )
}
