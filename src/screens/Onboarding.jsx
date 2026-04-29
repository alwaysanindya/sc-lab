import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Slide 1: Platform intro with real logos
const PlatformSlide = () => (
  <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap: 20}}>
    <img
      src="./images/logos/iitkgp_logo.png"
      alt="IIT Kharagpur"
      style={{ width: 80, height: 80, objectFit: 'contain' }}
    />
    <img
      src="./images/logos/crtdh_logo.png"
      alt="CRTDH"
      style={{ width: 140, height: 70, objectFit: 'contain' }}
    />
  </div>
)

// Slide 2: OroScan
const OroScanSlide = () => (
  <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
    <div style={{
      width: 100, height: 100, borderRadius: 24, backgroundColor: '#e0f2f1',
      display:'flex', alignItems:'center', justifyContent:'center'
    }}>
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="20" y="4" width="20" height="16" rx="6" fill="#0d7377" opacity="0.15"/>
        <rect x="20" y="4" width="20" height="16" rx="6" stroke="#0d7377" strokeWidth="2" fill="none"/>
        <circle cx="30" cy="12" r="4" fill="#0d7377" opacity="0.3"/>
        <circle cx="30" cy="12" r="2" fill="#0d7377"/>
        <rect x="27" y="20" width="6" height="24" rx="3" fill="#0d7377" opacity="0.15"/>
        <rect x="27" y="20" width="6" height="24" rx="3" stroke="#0d7377" strokeWidth="2" fill="none"/>
        <path d="M27 44 Q26 50 22 54" stroke="#0d7377" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M33 44 Q34 50 38 54" stroke="#0d7377" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    </div>
    {/* Feature pills */}
    <div style={{display:'flex', gap: 8, marginTop: 20, flexWrap:'wrap', justifyContent:'center'}}>
      <span style={{padding:'6px 12px', borderRadius:20, background:'#e0f2f1', color:'#0d7377', fontSize:'0.75rem', fontWeight:600}}>Intraoral Camera</span>
      <span style={{padding:'6px 12px', borderRadius:20, background:'#e0f2f1', color:'#0d7377', fontSize:'0.75rem', fontWeight:600}}>15s Screening</span>
      <span style={{padding:'6px 12px', borderRadius:20, background:'#e0f2f1', color:'#0d7377', fontSize:'0.75rem', fontWeight:600}}>Auto Analysis</span>
    </div>
  </div>
)

// Slide 3: HemoCube
const HemoCubeSlide = () => (
  <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
    <div style={{
      width: 100, height: 100, borderRadius: 24, backgroundColor: '#fef2f2',
      display:'flex', alignItems:'center', justifyContent:'center'
    }}>
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="14" y="8" width="28" height="40" rx="6" fill="#ef4444" opacity="0.1"/>
        <rect x="14" y="8" width="28" height="40" rx="6" stroke="#dc2626" strokeWidth="2" fill="none"/>
        <rect x="20" y="14" width="16" height="10" rx="2" fill="#dc2626" opacity="0.2"/>
        <rect x="20" y="14" width="16" height="10" rx="2" stroke="#dc2626" strokeWidth="1.5" fill="none"/>
        <line x1="28" y1="28" x2="28" y2="40" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 3"/>
        <circle cx="28" cy="43" r="2.5" fill="#dc2626"/>
      </svg>
    </div>
    <div style={{display:'flex', gap: 8, marginTop: 20, flexWrap:'wrap', justifyContent:'center'}}>
      <span style={{padding:'6px 12px', borderRadius:20, background:'#fef2f2', color:'#dc2626', fontSize:'0.75rem', fontWeight:600}}>Test Strip Reader</span>
      <span style={{padding:'6px 12px', borderRadius:20, background:'#fef2f2', color:'#dc2626', fontSize:'0.75rem', fontWeight:600}}>Hb Estimation</span>
      <span style={{padding:'6px 12px', borderRadius:20, background:'#fef2f2', color:'#dc2626', fontSize:'0.75rem', fontWeight:600}}>Anemia Detection</span>
    </div>
  </div>
)

// Slide 4: OptiHB
const OptiHBSlide = () => (
  <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
    <div style={{
      width: 100, height: 100, borderRadius: 24, backgroundColor: '#fefce8',
      display:'flex', alignItems:'center', justifyContent:'center'
    }}>
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="20" fill="#f59e0b" opacity="0.1"/>
        <circle cx="28" cy="28" r="20" stroke="#d97706" strokeWidth="2" fill="none"/>
        <circle cx="28" cy="28" r="8" fill="#d97706" opacity="0.2"/>
        <circle cx="28" cy="28" r="8" stroke="#d97706" strokeWidth="1.5" fill="none"/>
        <circle cx="28" cy="28" r="3" fill="#d97706"/>
        <line x1="28" y1="8" x2="28" y2="14" stroke="#d97706" strokeWidth="2"/>
        <line x1="28" y1="42" x2="28" y2="48" stroke="#d97706" strokeWidth="2"/>
        <line x1="8" y1="28" x2="14" y2="28" stroke="#d97706" strokeWidth="2"/>
        <line x1="42" y1="28" x2="48" y2="28" stroke="#d97706" strokeWidth="2"/>
        <line x1="14" y1="14" x2="18" y2="18" stroke="#d97706" strokeWidth="1.5"/>
        <line x1="38" y1="38" x2="42" y2="42" stroke="#d97706" strokeWidth="1.5"/>
        <line x1="38" y1="14" x2="42" y2="18" stroke="#d97706" strokeWidth="1.5"/>
        <line x1="14" y1="38" x2="18" y2="42" stroke="#d97706" strokeWidth="1.5"/>
      </svg>
    </div>
    <div style={{display:'flex', gap: 8, marginTop: 20, flexWrap:'wrap', justifyContent:'center'}}>
      <span style={{padding:'6px 12px', borderRadius:20, background:'#fefce8', color:'#d97706', fontSize:'0.75rem', fontWeight:600}}>Optical Sensor</span>
      <span style={{padding:'6px 12px', borderRadius:20, background:'#fefce8', color:'#d97706', fontSize:'0.75rem', fontWeight:600}}>Non-Invasive</span>
      <span style={{padding:'6px 12px', borderRadius:20, background:'#fefce8', color:'#d97706', fontSize:'0.75rem', fontWeight:600}}>Multi-Parameter</span>
    </div>
  </div>
)

const slides = [
  {
    component: PlatformSlide,
    title: 'SC Lab',
    description: 'A next-generation point-of-care screening platform by CRTDH, IIT Kharagpur — bringing affordable diagnostics to underserved communities.'
  },
  {
    component: OroScanSlide,
    title: 'OroScan',
    description: 'Intraoral camera for oral cavity screening. Captures optical and thermal images to detect lesions and abnormalities with automated analysis.'
  },
  {
    component: HemoCubeSlide,
    title: 'HemoCube',
    description: 'Compact hemoglobin estimation device using test strip colorimetry. Rapid anemia screening with lab-grade accuracy at point of care.'
  },
  {
    component: OptiHBSlide,
    title: 'OptiHB',
    description: 'Non-invasive optical screening for hemoglobin, SpO2, and heart rate. Multi-parameter analysis without blood sampling.'
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
        <div className="onboarding-slide" key={currentStep}>
          <div className="onboarding-illustration" style={{animation: 'scaleIn 0.4s ease-out'}}>
            <CurrentSlide />
          </div>
          <h1 className="onboarding-title" style={{animation: 'fadeInUp 0.4s ease-out 0.1s both'}}>
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
