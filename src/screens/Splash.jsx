import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const navigate = useNavigate()
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2800)
    const navTimer = setTimeout(() => {
      const auth = localStorage.getItem('sclab_auth')
      const seen = localStorage.getItem('sclab_onboarded')
      if (auth) navigate('/dashboard')
      else if (seen) navigate('/login')
      else navigate('/onboarding')
    }, 3300)
    return () => { clearTimeout(fadeTimer); clearTimeout(navTimer) }
  }, [navigate])

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#f7f9fc', padding: 24
      }}>

      {/* Logos */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40,
        animation: 'scaleIn 0.6s ease-out'
      }}>
        <img
          src="./images/logos/iitkgp_logo.png"
          alt="IIT Kharagpur"
          style={{ width: 72, height: 72, objectFit: 'contain' }}
        />

        {/* Divider */}
        <div style={{width: 1, height: 48, background: '#e2e8f0'}}></div>

        <img
          src="./images/logos/crtdh_logo.png"
          alt="CRTDH"
          style={{ width: 100, height: 72, objectFit: 'contain' }}
        />
      </div>

      {/* App name */}
      <h1 style={{
        fontSize: '2.5rem', fontWeight: 700, color: '#0d7377',
        margin: 0, letterSpacing: '-0.5px',
        animation: 'fadeInUp 0.5s ease-out 0.3s both'
      }}>
        SC Lab
      </h1>
      <p style={{
        fontSize: '1rem', color: '#64748b', margin: '8px 0 0',
        animation: 'fadeInUp 0.5s ease-out 0.5s both'
      }}>
        Point-of-Care Screening Platform
      </p>

      {/* Loader */}
      <div style={{marginTop: 48, animation: 'fadeIn 0.5s ease-out 0.8s both'}}>
        <div className="spinner" style={{
          width: 28, height: 28,
          borderColor: '#e2e8f0', borderTopColor: '#0d7377'
        }}></div>
      </div>
    </div>
  )
}
