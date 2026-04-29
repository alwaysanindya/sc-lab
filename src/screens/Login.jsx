import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { isValidEmail } from '../utils/helpers'

export default function Login() {
  const navigate = useNavigate()
  const { login, error, isLoading } = useAuth()
  const [email, setEmail] = useState('admin@sclab.in')
  const [password, setPassword] = useState('password')
  const [validationError, setValidationError] = useState('')
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    // Check if install prompt is already available
    if (window.deferredPrompt) setShowInstall(true)

    const onReady = () => setShowInstall(true)
    const onInstalled = () => setShowInstall(false)
    window.addEventListener('pwaInstallReady', onReady)
    window.addEventListener('pwaInstalled', onInstalled)
    return () => {
      window.removeEventListener('pwaInstallReady', onReady)
      window.removeEventListener('pwaInstalled', onInstalled)
    }
  }, [])

  const handleInstall = async () => {
    const prompt = window.deferredPrompt
    if (!prompt) return
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setShowInstall(false)
    window.deferredPrompt = null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidationError('')

    if (!email.trim()) {
      setValidationError('Email is required')
      return
    }

    if (!isValidEmail(email)) {
      setValidationError('Please enter a valid email')
      return
    }

    if (!password) {
      setValidationError('Password is required')
      return
    }

    try {
      const success = await login(email, password)
      if (success) {
        navigate('/dashboard')
      }
    } catch (err) {
      setValidationError('Login failed. Please try again.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img
            src="./images/logos/iitkgp_logo.png"
            alt="IIT Kharagpur"
            style={{ width: 72, height: 72, objectFit: 'contain', marginBottom: 12 }}
          />
          <h1>SC Lab</h1>
          <p>Point-of-Care Screening Platform</p>
        </div>

        {/* PWA Install Banner */}
        {showInstall && (
          <div style={{
            margin: '0 0 16px',
            padding: '12px 16px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0d7377, #0a5a63)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'fadeInUp 0.3s ease-out'
          }}>
            <div style={{flex: 1}}>
              <div style={{fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px'}}>Install SC Lab</div>
              <div style={{fontSize: '0.75rem', opacity: 0.85}}>Add to home screen for quick access</div>
            </div>
            <button
              onClick={handleInstall}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1.5px solid rgba(255,255,255,0.5)',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Install
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              aria-label="Email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              aria-label="Password"
            />
          </div>

          {(error || validationError) && (
            <div className="error-message" role="alert">
              {error || validationError}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p className="demo-credentials">
           
          </p>
        </div>
      </div>
    </div>
  )
}
