import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getActiveUnits, getAllUnits, getDeviceById } from '../data/devices'
import { delay } from '../utils/helpers'

// WiFi Icon for scanning phase
const WiFiIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 56a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#0d7377"/>
    <path d="M20 42c-2 2-2 6 0 8m24-8c2 2 2 6 0 8" stroke="#0d7377" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M12 34c-4 4-4 10 0 14m40-14c4 4 4 10 0 14" stroke="#0d7377" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M4 26c-6 6-6 16 0 22m56-22c6 6 6 16 0 22" stroke="#0d7377" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
  </svg>
)

// Green pulsing dot for active units
const ActiveDot = () => (
  <div style={{
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    boxShadow: '0 0 0 8px rgba(16, 185, 129, 0.2)',
    animation: 'pulse 2s ease-in-out infinite'
  }} />
)

export default function WiFiConnect() {
  const navigate = useNavigate()
  const { deviceId } = useParams()
  const device = getDeviceById(deviceId)
  const [isScanning, setIsScanning] = useState(true)
  const [selectedUnitId, setSelectedUnitId] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState(null)

  const activeUnits = getActiveUnits(deviceId)
  const allUnits = getAllUnits(deviceId)

  // Scanning phase (3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScanning(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (isScanning) {
    return (
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ marginBottom: '24px', animation: 'breathe 3s ease-in-out infinite' }}>
            <WiFiIcon />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0d7377', marginBottom: '8px' }}>
            Scanning for devices...
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
            Searching for {device?.name} hotspot...
          </p>
        </div>
      </div>
    )
  }

  const handleUnitSelect = async (unitId) => {
    setSelectedUnitId(unitId)
    setConnectionStatus(null)
  }

  const handleConnect = async () => {
    if (!selectedUnitId) {
      setConnectionStatus('error')
      return
    }

    setIsConnecting(true)
    setConnectionStatus('connecting')

    await delay(2000)

    const patientData = JSON.parse(localStorage.getItem('sclab_current_patient') || '{}')
    const connectionData = {
      deviceId,
      unitId: selectedUnitId,
      connectedAt: new Date().toISOString(),
      patientId: patientData.id
    }

    localStorage.setItem('sclab_connection', JSON.stringify(connectionData))
    setConnectionStatus('connected')

    await delay(800)
    navigate(`/capture/${deviceId}`)
  }

  const handleSkip = () => {
    const defaultUnit = activeUnits[0]
    if (defaultUnit) {
      setSelectedUnitId(defaultUnit.id)
      localStorage.setItem('sclab_connection', JSON.stringify({
        deviceId,
        unitId: defaultUnit.id,
        connectedAt: new Date().toISOString()
      }))
      navigate(`/capture/${deviceId}`)
    }
  }

  return (
    <div className="app-container">
      <header style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
        <button
          className="btn-back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          style={{ position: 'absolute', left: '20px', top: '20px' }}
        >
          ←
        </button>
        <h1 style={{ margin: '0 0 8px', fontSize: '1.5rem' }}>{device?.name}</h1>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>Select a unit to connect</p>
      </header>

      {/* Unit summary bar */}
      <div style={{
        display: 'flex', gap: '12px', padding: '16px 20px',
        borderBottom: '1px solid var(--border-color)', background: '#f7f9fc'
      }}>
        <div style={{
          flex: 1, textAlign: 'center', padding: '10px',
          background: '#fff', borderRadius: '10px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>{allUnits.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>Total Units</div>
        </div>
        <div style={{
          flex: 1, textAlign: 'center', padding: '10px',
          background: '#fff', borderRadius: '10px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981' }}>{activeUnits.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>Active</div>
        </div>
        <div style={{
          flex: 1, textAlign: 'center', padding: '10px',
          background: '#fff', borderRadius: '10px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ef4444' }}>{allUnits.length - activeUnits.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>Offline</div>
        </div>
      </div>

      <div style={{ padding: '20px', flex: 1, overflow: 'auto' }}>
        <div className="unit-list">
          {allUnits.length > 0 ? (
            allUnits.map((unit) => (
              <div
                key={unit.id}
                className={`unit-item ${selectedUnitId === unit.id ? 'selected' : ''} ${!unit.active ? 'inactive' : ''}`}
                onClick={() => unit.active && handleUnitSelect(unit.id)}
                role="button"
                tabIndex={unit.active ? '0' : '-1'}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && unit.active) handleUnitSelect(unit.id)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: '14px',
                  border: selectedUnitId === unit.id ? '1.5px solid var(--primary)' : '1.5px solid var(--border-color)',
                  backgroundColor: selectedUnitId === unit.id ? '#f0fdfa' : 'var(--bg-card)',
                  cursor: unit.active ? 'pointer' : 'not-allowed',
                  opacity: unit.active ? 1 : 0.5,
                  transition: 'all var(--transition-fast)'
                }}
              >
                {unit.active && <ActiveDot />}
                {!unit.active && (
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
                )}

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    {unit.id}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {unit.name}
                  </div>
                </div>

                {unit.active && (
                  <span className="badge badge-success">Active</span>
                )}
                {!unit.active && (
                  <span className="badge badge-danger">Offline</span>
                )}
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 20px', color: 'var(--text-secondary)' }}>
              <p>No units available for this device</p>
            </div>
          )}
        </div>

        {connectionStatus && (
          <div style={{
            marginTop: '20px',
            padding: '16px',
            borderRadius: '12px',
            textAlign: 'center',
            backgroundColor: connectionStatus === 'connected' ? '#dcfce7' : connectionStatus === 'error' ? '#fee2e2' : 'rgba(13, 115, 119, 0.05)',
            color: connectionStatus === 'connected' ? '#166534' : connectionStatus === 'error' ? '#991b1b' : '#0d7377',
            fontSize: '0.9rem'
          }}>
            {connectionStatus === 'connecting' && (
              <>
                <div className="spinner" style={{ width: '20px', height: '20px', margin: '0 auto 8px', borderWidth: '2px' }}></div>
                <p style={{ margin: 0 }}>Connecting to unit...</p>
              </>
            )}
            {connectionStatus === 'connected' && (
              <>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '4px' }}>✓</span>
                <p style={{ margin: 0 }}>Successfully connected</p>
              </>
            )}
            {connectionStatus === 'error' && (
              <>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '4px' }}>⚠</span>
                <p style={{ margin: 0 }}>Please select a unit first</p>
              </>
            )}
          </div>
        )}
      </div>

      <div style={{ padding: '20px', display: 'flex', gap: '12px', borderTop: '1px solid var(--border-color)' }}>
        <button
          className="btn btn-secondary btn-full"
          onClick={handleSkip}
          disabled={isConnecting}
        >
          Skip
        </button>
        <button
          className="btn btn-primary btn-full"
          onClick={handleConnect}
          disabled={!selectedUnitId || isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Connect'}
        </button>
      </div>
    </div>
  )
}
