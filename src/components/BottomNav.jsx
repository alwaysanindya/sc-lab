import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  {
    id: 'home',
    label: 'Home',
    path: '/dashboard',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#0d7377' : 'none'} stroke={active ? '#0d7377' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22" fill={active ? 'rgba(255,255,255,0.4)' : 'none'}/>
      </svg>
    )
  },
  {
    id: 'history',
    label: 'History',
    path: '/history',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#0d7377' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    )
  },
  {
    id: 'scan',
    label: 'Scan',
    path: '/dashboard',
    isScan: true,
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    )
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#0d7377' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    )
  }
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (tab) => {
    if (tab.id === 'scan') return false
    if (tab.id === 'home') {
      return currentPath === '/dashboard' || currentPath.startsWith('/register') || currentPath.startsWith('/wifi') || currentPath.startsWith('/capture') || currentPath.startsWith('/results') || currentPath.startsWith('/analysis') || currentPath.startsWith('/report')
    }
    return currentPath === tab.path
  }

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 64,
      background: '#fff',
      borderTop: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 8px',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      zIndex: 1000,
      boxShadow: '0 -2px 10px rgba(0,0,0,0.04)'
    }}>
      {tabs.map((tab) => {
        const active = isActive(tab)

        if (tab.isScan) {
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #0d7377, #0a5a63)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(13, 115, 119, 0.35)',
                transform: 'translateY(-4px)',
                transition: 'transform 0.15s ease'
              }}
              aria-label="New Scan"
            >
              {tab.icon(false)}
            </button>
          )
        }

        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: '6px 12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              minWidth: 56,
              transition: 'all 0.15s ease'
            }}
            aria-label={tab.label}
          >
            {tab.icon(active)}
            <span style={{
              fontSize: '0.65rem',
              fontWeight: active ? 600 : 500,
              color: active ? '#0d7377' : '#94a3b8',
              letterSpacing: '0.2px'
            }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
