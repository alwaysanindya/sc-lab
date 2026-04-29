import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Slide 1: Welcome with logos side by side, larger
const WelcomeSlide = () => (
  <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap: 20}}>
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap: 28}}>
      <img
        src="./images/logos/iitkgp_logo.png"
        alt="IIT Kharagpur"
        style={{ width: 100, height: 100, objectFit: 'contain' }}
      />
      <img
        src="./images/logos/crtdh_logo.png"
        alt="CRTDH"
        style={{ width: 160, height: 80, objectFit: 'contain' }}
      />
    </div>
    <div style={{
      marginTop: 8, padding: '8px 20px', borderRadius: 20,
      background: 'rgba(13, 115, 119, 0.08)', border: '1px solid rgba(13, 115, 119, 0.15)'
    }}>
      <span style={{fontSize: '0.78rem', fontWeight: 600, color: '#0d7377', letterSpacing: '0.3px'}}>
        Point-of-Care Data Collection
      </span>
    </div>
  </div>
)

// Slide 2: How it works – 3 steps (compact to avoid overlap)
const HowItWorksSlide = () => {
  const steps = [
    {
      label: 'Connect',
      desc: 'Link POC device via WiFi',
      color: '#0d7377',
      bg: '#e0f2f1',
      icon: (
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
          <path d="M7 20a8.5 8.5 0 0 1 14 0" stroke="#0d7377" strokeWidth="2" strokeLinecap="round"/>
          <path d="M10 17a5 5 0 0 1 8 0" stroke="#0d7377" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="14" cy="20" r="1.5" fill="#0d7377"/>
        </svg>
      )
    },
    {
      label: 'Screen',
      desc: 'Register patient & capture data',
      color: '#2563eb',
      bg: '#eff6ff',
      icon: (
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
          <rect x="6" y="4" width="16" height="20" rx="3" stroke="#2563eb" strokeWidth="2"/>
          <line x1="10" y1="10" x2="18" y2="10" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="10" y1="14" x2="16" y2="14" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="10" y1="18" x2="14" y2="18" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      label: 'Analyze',
      desc: 'Get AI-powered results',
      color: '#059669',
      bg: '#ecfdf5',
      icon: (
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="10" stroke="#059669" strokeWidth="2"/>
          <path d="M10 14l3 3 5-6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ]

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap: 10, width: '100%', maxWidth: 280}}>
      {steps.map((step, i) => (
        <div key={i} style={{position:'relative', width:'100%'}}>
          <div style={{
            display:'flex', alignItems:'center', gap: 12,
            background: '#fff', borderRadius: 12, padding: '10px 14px',
            border: `1.5px solid ${step.bg}`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10, background: step.bg,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0
            }}>
              {step.icon}
            </div>
            <div>
              <div style={{fontSize: '0.85rem', fontWeight: 600, color: step.color}}>{step.label}</div>
              <div style={{fontSize: '0.72rem', color: '#64748b', marginTop: 1}}>{step.desc}</div>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div style={{
              position:'absolute', left: 33, bottom: -8, width: 2, height: 8,
              background: `linear-gradient(${step.color}, ${steps[i+1].color})`, opacity: 0.25
            }}/>
          )}
        </div>
      ))}
    </div>
  )
}

// Slide 3: Supported devices (compact)
const DevicesSlide = () => {
  const devices = [
    {
      name: 'OroScan',
      desc: 'Oral cavity screening',
      color: '#0d7377', bg: '#e0f2f1',
      icon: (
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
          <rect x="11" y="2" width="10" height="8" rx="3" fill="#0d7377" opacity="0.2"/>
          <rect x="11" y="2" width="10" height="8" rx="3" stroke="#0d7377" strokeWidth="1.5" fill="none"/>
          <circle cx="16" cy="6" r="1.5" fill="#0d7377"/>
          <rect x="14.5" y="10" width="3" height="14" rx="1.5" stroke="#0d7377" strokeWidth="1.5" fill="none"/>
        </svg>
      )
    },
    {
      name: 'HemoCube',
      desc: 'Hemoglobin estimation',
      color: '#dc2626', bg: '#fef2f2',
      icon: (
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
          <rect x="8" y="4" width="12" height="20" rx="3" fill="#ef4444" opacity="0.15"/>
          <rect x="8" y="4" width="12" height="20" rx="3" stroke="#dc2626" strokeWidth="1.5" fill="none"/>
          <rect x="11" y="8" width="6" height="4" rx="1" fill="#dc2626" opacity="0.3"/>
          <circle cx="14" cy="20" r="1.5" fill="#dc2626"/>
        </svg>
      )
    },
    {
      name: 'OptiHB',
      desc: 'Non-invasive optical screening',
      color: '#d97706', bg: '#fefce8',
      icon: (
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="10" fill="#f59e0b" opacity="0.12"/>
          <circle cx="14" cy="14" r="10" stroke="#d97706" strokeWidth="1.5" fill="none"/>
          <circle cx="14" cy="14" r="4" fill="#d97706" opacity="0.3"/>
          <circle cx="14" cy="14" r="1.5" fill="#d97706"/>
        </svg>
      )
    }
  ]

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap: 8, width: '100%', maxWidth: 260}}>
      {devices.map((d) => (
        <div key={d.name} style={{
          display:'flex', alignItems:'center', gap: 12, width: '100%',
          background: '#fff', borderRadius: 12, padding: '10px 14px',
          border: `1.5px solid ${d.bg}`, boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: d.bg,
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0
          }}>
            {d.icon}
          </div>
          <div>
            <div style={{fontSize: '0.85rem', fontWeight: 600, color: d.color}}>{d.name}</div>
            <div style={{fontSize: '0.7rem', color: '#64748b', marginTop: 1}}>{d.desc}</div>
          </div>
        </div>
      ))}
      <div style={{
        marginTop: 2, padding: '5px 12px', borderRadius: 14,
        background: '#f7f9fc', border: '1px solid #e2e8f0'
      }}>
        <span style={{fontSize: '0.7rem', color: '#94a3b8'}}>More devices coming soon</span>
      </div>
    </div>
  )
}

// Slide 4: PI credit with photo
const CreditSlide = () => (
  <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap: 14}}>
    <img
      src="./images/logos/suman_chakraborty.jpeg"
      alt="Prof. Suman Chakraborty"
      style={{
        width: 96, height: 96, borderRadius: 50,
        objectFit: 'cover', border: '3px solid #e0f2f1',
        boxShadow: '0 4px 16px rgba(13, 115, 119, 0.2)'
      }}
    />
    <div style={{textAlign:'center'}}>
      <div style={{fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 4}}>
        Principal Investigator
      </div>
      <div style={{fontSize: '1.1rem', fontWeight: 700, color: '#1e293b'}}>
        Prof. Suman Chakraborty
      </div>
    </div>
    <div style={{
      display:'flex', alignItems:'center', gap: 12,
      padding: '10px 18px', borderRadius: 12,
      background: '#f7f9fc', border: '1px solid #e2e8f0'
    }}>
      <img src="./images/logos/crtdh_logo.png" alt="CRTDH" style={{width: 28, height: 28, objectFit:'contain'}}/>
      <div>
        <div style={{fontSize: '0.8rem', fontWeight: 600, color: '#1e293b'}}>CRTDH</div>
        <div style={{fontSize: '0.68rem', color: '#64748b'}}>IIT Kharagpur</div>
      </div>
    </div>
  </div>
)

const slides = [
  {
    component: WelcomeSlide,
    title: 'Welcome to SC Lab',
    description: 'A unified data collection platform for point-of-care screening devices – bringing affordable diagnostics to underserved communities.'
  },
  {
    component: HowItWorksSlide,
    title: 'How it works',
    description: 'Three simple steps from device connection to AI-powered screening results.'
  },
  {
    component: DevicesSlide,
    title: 'Supported devices',
    description: 'Capture data from multiple POC devices developed at CRTDH, IIT Kharagpur.'
  },
  {
    component: CreditSlide,
    title: 'Built for impact',
    description: 'Developed under the guidance of Prof. Suman Chakraborty at the Common Research & Development Hub.'
  }
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const goTo = (step) => setCurrentStep(step)

  const handleNext = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      localStorage.setItem('sclab_onboarded', 'true')
      navigate('/login')
    }
  }

  const handleSkip = () => {
    localStorage.setItem('sclab_onboarded', 'true')
    navigate('/login')
  }

  const CurrentSlide = slides[currentStep].component

  return (
    <div className="onboarding">
      {/* Skip button */}
      {currentStep < slides.length - 1 && (
        <button className="skip-btn" onClick={handleSkip}>Skip</button>
      )}

      {/* Slide content */}
      <div className="onboarding-slide-container">
        <div className="onboarding-slide active" key={currentStep}>
          <div className="onboarding-illustration" style={{animation: 'scaleIn 0.4s ease-out'}}>
            <CurrentSlide />
          </div>
          <h1 className="onboarding-title" style={{animation: 'fadeInUp 0.4s ease-out 0.1s both', marginTop: 24}}>
            {slides[currentStep].title}
          </h1>
          <p className="onboarding-description" style={{animation: 'fadeInUp 0.4s ease-out 0.2s both'}}>
            {slides[currentStep].description}
          </p>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="onboarding-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`onboarding-dot ${i === currentStep ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Step ${i + 1}`}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="onboarding-actions">
        {currentStep === slides.length - 1 ? (
          <button className="btn btn-primary btn-full" onClick={handleNext}>
            Get Started
          </button>
        ) : (
          <>
            <div></div>
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          </>
        )}
      </div>
    </div>
  )
}
