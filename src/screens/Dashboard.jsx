import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getAllDevices } from '../data/devices'
import { getGreeting } from '../utils/helpers'

// Device SVG Icons
const OroScanIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="11" y="2" width="10" height="8" rx="3" fill="#0d7377" opacity="0.15"/>
    <rect x="11" y="2" width="10" height="8" rx="3" stroke="#0d7377" strokeWidth="1.5" fill="none"/>
    <circle cx="16" cy="6" r="2.5" fill="#0d7377" opacity="0.3"/>
    <circle cx="16" cy="6" r="1" fill="#0d7377"/>
    <rect x="14.5" y="10" width="3" height="14" rx="1.5" fill="#0d7377" opacity="0.2"/>
    <rect x="14.5" y="10" width="3" height="14" rx="1.5" stroke="#0d7377" strokeWidth="1.5" fill="none"/>
    <path d="M14.5 24 Q14 28 12 30" stroke="#0d7377" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M17.5 24 Q18 28 20 30" stroke="#0d7377" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
)

const HemoCubeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="8" y="4" width="12" height="20" rx="3" fill="#ef4444" opacity="0.15"/>
    <rect x="8" y="4" width="12" height="20" rx="3" stroke="#dc2626" strokeWidth="1.5" fill="none"/>
    <rect x="11" y="8" width="6" height="4" rx="1" fill="#dc2626" opacity="0.3"/>
    <line x1="14" y1="14" x2="14" y2="20" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2"/>
    <circle cx="14" cy="22" r="1" fill="#dc2626"/>
  </svg>
)

const OptiHBIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="10" fill="#f59e0b" opacity="0.12"/>
    <circle cx="14" cy="14" r="10" stroke="#d97706" strokeWidth="1.5" fill="none"/>
    <circle cx="14" cy="14" r="4" fill="#d97706" opacity="0.3"/>
    <line x1="14" y1="4" x2="14" y2="7" stroke="#d97706" strokeWidth="1.5"/>
    <line x1="14" y1="21" x2="14" y2="24" stroke="#d97706" strokeWidth="1.5"/>
    <line x1="4" y1="14" x2="7" y2="14" stroke="#d97706" strokeWidth="1.5"/>
    <line x1="21" y1="14" x2="24" y2="14" stroke="#d97706" strokeWidth="1.5"/>
  </svg>
)

const deviceIcons = {
  oroscan: { icon: <OroScanIcon />, bgColor: '#e0f2f1' },
  hemocube: { icon: <HemoCubeIcon />, bgColor: '#fef2f2' },
  optihb: { icon: <OptiHBIcon />, bgColor: '#fefce8' }
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const devices = getAllDevices()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard">
      {/* Light header */}
      <header style={{
        padding: '20px 20px 16px',
        background: '#fff',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h1 style={{fontSize: '1.4rem', fontWeight: 600, color: '#1e293b', margin: 0}}>
              {getGreeting()}, {user?.name?.split(' ')[0] || 'Admin'}
            </h1>
            <p style={{fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0'}}>
              Select a device to begin screening
            </p>
          </div>
          <div style={{display: 'flex', gap: 8}}>
            <button
              onClick={() => navigate('/history')}
              style={{
                width: 40, height: 40, borderRadius: 12,
                border: '1px solid #e2e8f0', background: '#f7f9fc',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#64748b'
              }}
              aria-label="History"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" fill="currentColor"/>
              </svg>
            </button>
            <button
              onClick={handleLogout}
              style={{
                width: 40, height: 40, borderRadius: 12,
                border: '1px solid #e2e8f0', background: '#f7f9fc',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#64748b'
              }}
              aria-label="Logout"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Device cards */}
      <main style={{padding: 20}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          {devices.map((device) => {
            const info = deviceIcons[device.id] || deviceIcons.hemocube
            return (
              <div
                key={device.id}
                className="device-card"
                onClick={() => navigate(`/register/${device.id}`)}
                role="button"
                tabIndex="0"
                style={{
                  background: '#fff', borderRadius: 16, padding: 20,
                  display: 'flex', alignItems: 'center', gap: 16,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  border: '1px solid #f1f5f9',
                  cursor: 'pointer', transition: 'transform 0.15s ease'
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  backgroundColor: info.bgColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {info.icon}
                </div>
                <div style={{flex: 1, minWidth: 0}}>
                  <h2 style={{fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', margin: 0}}>
                    {device.name}
                  </h2>
                  <p style={{fontSize: '0.82rem', color: '#64748b', margin: '3px 0 0', lineHeight: 1.4}}>
                    {device.description}
                  </p>
                </div>
                <span style={{color: '#94a3b8', fontSize: '1.4rem', fontWeight: 300, flexShrink: 0}}>›</span>
              </div>
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center', padding: '24px 20px',
        borderTop: '1px solid #f1f5f9', marginTop: 'auto'
      }}>
        <p style={{fontSize: '0.75rem', color: '#94a3b8', margin: 0}}>
          SC Lab v1.0 · IIT Kharagpur | CRTDH
        </p>
      </footer>
    </div>
  )
}
