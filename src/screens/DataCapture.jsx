import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDeviceById } from '../data/devices'

// Device-specific durations
const CAPTURE_DURATIONS = {
  oroscan: 15000,  // 15 seconds
  hemocube: 10000,  // 10 seconds
  optihb: 10000     // 10 seconds
}

const statusMessages = {
  oroscan: [
    'Connecting to device...',
    'Fetching optical images...',
    'Fetching thermal images...',
    'Downloading data...'
  ],
  hemocube: [
    'Initializing sensor...',
    'Reading strip data...',
    'Measuring hemoglobin...',
    'Calibrating results...'
  ],
  optihb: [
    'Initializing optical sensor...',
    'Measuring hemoglobin...',
    'Measuring SpO2...',
    'Measuring heart rate...'
  ]
}

export default function DataCapture() {
  const navigate = useNavigate()
  const { deviceId } = useParams()
  const device = getDeviceById(deviceId)
  const [started, setStarted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const startTime = useRef(null)

  const duration = CAPTURE_DURATIONS[deviceId] || 15000
  const durationSec = duration / 1000
  const messages = statusMessages[deviceId] || statusMessages.hemocube

  // Initialize timeLeft display
  useEffect(() => {
    setTimeLeft(durationSec)
  }, [durationSec])

  // Run capture once started
  useEffect(() => {
    if (!started) return

    startTime.current = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime.current
      const pct = Math.min((elapsed / duration) * 100, 100)
      const remaining = Math.max(Math.ceil((duration - elapsed) / 1000), 0)

      setProgress(pct)
      setTimeLeft(remaining)

      if (elapsed >= duration) {
        clearInterval(interval)
        localStorage.setItem('sclab_capture_time', new Date().toISOString())
        setTimeout(() => navigate(`/results/${deviceId}`), 1000)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [started, deviceId, navigate, duration])

  const messageIndex = Math.min(Math.floor(progress / 25), 3)
  const circumference = 2 * Math.PI * 54

  // Pre-start screen with "Start Screening" button
  if (!started) {
    return (
      <div className="data-capture">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', maxWidth: '360px', width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#fff', marginBottom: '8px', fontSize: '1.2rem', fontWeight: 600 }}>
              {device?.name || 'Device'} Connected
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: 0 }}>
              {deviceId === 'oroscan'
                ? 'Ready to fetch captured data from device'
                : `Ready to begin ${durationSec}-second screening`}
            </p>
          </div>

          {/* Device icon */}
          <div style={{
            width: 120, height: 120, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'breathe 3s ease-in-out infinite'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="rgba(255,255,255,0.8)"/>
            </svg>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 20px',
            color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', textAlign: 'center', width: '100%'
          }}>
            Ensure device is positioned correctly and patient is ready.
          </div>

          <button
            onClick={() => setStarted(true)}
            style={{
              width: '100%', padding: '16px', borderRadius: '14px',
              background: '#fff', color: '#0d7377', border: 'none',
              fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer',
              letterSpacing: '0.5px'
            }}
          >
            {deviceId === 'oroscan' ? 'Fetch Device Data' : 'Start Screening'}
          </button>

          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'transparent', border: '1.5px solid rgba(255,255,255,0.3)',
              color: 'rgba(255,255,255,0.7)', padding: '12px', borderRadius: '12px',
              fontSize: '0.9rem', cursor: 'pointer', width: '100%'
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="data-capture">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', maxWidth: '360px', width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#fff', marginBottom: '8px', fontSize: '1.1rem', fontWeight: 600 }}>
            {device?.name || 'Device'} Screening
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: 0 }}>
            Please keep device stable
          </p>
        </div>

        <div style={{ position: 'relative', width: 180, height: 180 }}>
          <svg viewBox="0 0 120 120" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8"/>
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke="#fff" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (progress / 100) * circumference}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff'
          }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 700 }}>{Math.round(progress)}%</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{timeLeft}s remaining</div>
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 20px',
          color: '#fff', fontSize: '0.9rem', textAlign: 'center', minHeight: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%'
        }}>
          {progress >= 100 ? (
            <span style={{ color: '#4ade80', fontWeight: 600 }}>Data capture complete</span>
          ) : (
            <>
              <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2, flexShrink: 0 }}></span>
              <span>{messages[messageIndex]}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
