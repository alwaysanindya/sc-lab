import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Settings() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleClearData = () => {
    if (window.confirm('Clear all app data? This will log you out and remove all screening history.')) {
      localStorage.clear()
      navigate('/')
    }
  }

  const menuItems = [
    {
      section: 'Account',
      items: [
        {
          label: 'Profile',
          subtitle: user?.email || 'admin@sclab.in',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d7377" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/>
              <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
            </svg>
          )
        },
        {
          label: 'Notifications',
          subtitle: 'Enabled',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d7377" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          )
        }
      ]
    },
    {
      section: 'App',
      items: [
        {
          label: 'Clear App Data',
          subtitle: 'Remove all history and settings',
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          ),
          danger: true,
          onClick: handleClearData
        }
      ]
    }
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fc' }}>
      {/* Header */}
      <header style={{
        padding: '20px 20px 16px',
        background: '#fff',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#1e293b', margin: 0 }}>Settings</h1>
      </header>

      {/* User card */}
      <div style={{ padding: '20px' }}>
        <div style={{
          background: '#fff', borderRadius: 16, padding: 20,
          display: 'flex', alignItems: 'center', gap: 16,
          border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, #0d7377, #0a5a63)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '1.2rem', fontWeight: 700
          }}>
            {(user?.name || 'A').charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '1.05rem', color: '#1e293b' }}>
              {user?.name || 'Admin User'}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 2 }}>
              {user?.email || 'admin@sclab.in'}
            </div>
          </div>
        </div>
      </div>

      {/* Menu sections */}
      <div style={{ padding: '0 20px' }}>
        {menuItems.map((section) => (
          <div key={section.section} style={{ marginBottom: 20 }}>
            <div style={{
              fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8',
              textTransform: 'uppercase', letterSpacing: '0.5px',
              padding: '0 4px', marginBottom: 8
            }}>
              {section.section}
            </div>
            <div style={{
              background: '#fff', borderRadius: 14,
              border: '1px solid #f1f5f9',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              overflow: 'hidden'
            }}>
              {section.items.map((item, idx) => (
                <div
                  key={item.label}
                  onClick={item.onClick || undefined}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 16px',
                    borderTop: idx > 0 ? '1px solid #f1f5f9' : 'none',
                    cursor: item.onClick ? 'pointer' : 'default'
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: item.danger ? '#fef2f2' : '#e0f2f1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '0.92rem', fontWeight: 500,
                      color: item.danger ? '#dc2626' : '#1e293b'
                    }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 1 }}>
                      {item.subtitle}
                    </div>
                  </div>
                  <span style={{ color: '#cbd5e1', fontSize: '1.2rem' }}>›</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout button */}
      <div style={{ padding: '0 20px 20px' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%', padding: '14px',
            background: '#fff', border: '1.5px solid #fca5a5',
            borderRadius: 14, color: '#dc2626',
            fontSize: '0.95rem', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.15s ease'
          }}
        >
          Sign Out
        </button>
      </div>

      {/* Developer & About section */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8',
          textTransform: 'uppercase', letterSpacing: '0.5px',
          padding: '0 4px', marginBottom: 8
        }}>
          About
        </div>
        <div style={{
          background: '#fff', borderRadius: 14,
          border: '1px solid #f1f5f9',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          overflow: 'hidden'
        }}>
          {/* PI Card */}
          <div style={{
            padding: '16px',
            display: 'flex', alignItems: 'center', gap: 14
          }}>
            <img
              src="./images/logos/suman_chakraborty.jpeg"
              alt="Prof. Suman Chakraborty"
              style={{
                width: 44, height: 44, borderRadius: 12,
                objectFit: 'cover', flexShrink: 0
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500, letterSpacing: '0.3px', textTransform: 'uppercase' }}>
                Principal Investigator
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b', marginTop: 2 }}>
                Prof. Suman Chakraborty
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 1 }}>
                Department of Mechanical Engineering
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9' }}/>

          {/* Lab info */}
          <div style={{
            padding: '16px',
            display: 'flex', alignItems: 'center', gap: 14
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: '#e0f2f1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <img src="./images/logos/crtdh_logo.png" alt="CRTDH" style={{width: 28, height: 28, objectFit: 'contain'}}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>
                CRTDH
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 1 }}>
                Common Research & Development Hub
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 1 }}>
                IIT Kharagpur, West Bengal, India
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9' }}/>

          {/* Mission */}
          <div style={{ padding: '16px' }}>
            <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.6 }}>
              SC Lab is a unified data collection platform for point-of-care screening devices developed at CRTDH. Our mission is to make lab-grade diagnostics accessible and affordable for underserved communities across India.
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9' }}/>

          {/* Supported devices */}
          <div style={{ padding: '16px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.3px', marginBottom: 10 }}>
              Supported devices
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ padding: '5px 12px', borderRadius: 8, background: '#e0f2f1', color: '#0d7377', fontSize: '0.75rem', fontWeight: 600 }}>OroScan</span>
              <span style={{ padding: '5px 12px', borderRadius: 8, background: '#fef2f2', color: '#dc2626', fontSize: '0.75rem', fontWeight: 600 }}>HemoCube</span>
              <span style={{ padding: '5px 12px', borderRadius: 8, background: '#fefce8', color: '#d97706', fontSize: '0.75rem', fontWeight: 600 }}>OptiHB</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9' }}/>

          {/* Version + Developer */}
          <div style={{ padding: '14px 16px' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 8
            }}>
              <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Version</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b' }}>1.2.0</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              Developed by Anindya Roy, Principal Project Associate, IIT Kharagpur
            </div>
          </div>
        </div>
      </div>

      {/* Footer logos */}
      <div style={{
        padding: '16px 20px 32px', textAlign: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16
      }}>
        <img src="./images/logos/iitkgp_logo.png" alt="IIT Kharagpur" style={{width: 36, height: 36, objectFit: 'contain', opacity: 0.4}}/>
        <img src="./images/logos/crtdh_logo.png" alt="CRTDH" style={{width: 60, height: 30, objectFit: 'contain', opacity: 0.4}}/>
      </div>
    </div>
  )
}
