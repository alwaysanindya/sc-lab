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
  const { user } = useAuth()
  const devices = getAllDevices()

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
          <img
            src="./images/logos/crtdh_logo.png"
            alt="CRTDH"
            style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 10 }}
          />
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

    </div>
  )
}
