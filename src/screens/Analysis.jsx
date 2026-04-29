import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDeviceById } from '../data/devices'
import { generateAIAnalysis } from '../data/results'
import { formatDate } from '../utils/helpers'

// Brain Icon
const BrainIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
  </svg>
)

export default function Analysis() {
  const navigate = useNavigate()
  const { deviceId } = useParams()
  const [analysis, setAnalysis] = useState(null)
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const device = getDeviceById(deviceId)

  useEffect(() => {
    const storedResults = localStorage.getItem('sclab_last_result')
    if (storedResults) setResults(JSON.parse(storedResults))

    const timer = setTimeout(() => {
      const analysisData = generateAIAnalysis(deviceId)
      setAnalysis(analysisData)
      localStorage.setItem('sclab_last_analysis', JSON.stringify(analysisData))
      setIsLoading(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [deviceId])

  if (isLoading) {
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'linear-gradient(135deg, #0d7377, #0a5a63)'}}>
        <div style={{marginBottom:'24px',animation:'pulse 1.5s ease-in-out infinite',color:'#fff'}}>
          <BrainIcon />
        </div>
        <h2 style={{color:'#fff',marginBottom:'8px',fontSize:'1.25rem',fontWeight:600}}>
          {deviceId === 'oroscan' ? 'Analyzing images...' : 'Analyzing data...'}
        </h2>
        <p style={{color:'rgba(255,255,255,0.7)',fontSize:'0.9rem',marginBottom:'20px'}}>
          {deviceId === 'oroscan' ? 'Processing captured images...' : 'Computing biomarker values...'}
        </p>
        <div style={{display:'flex',gap:'6px'}}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width:'8px',height:'8px',borderRadius:'50%',backgroundColor:'#fff',
              animation:`pulse 1.4s ease-in-out ${i*0.2}s infinite`
            }}/>
          ))}
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="app-container" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <p style={{color:'var(--text-secondary)'}}>Loading analysis...</p>
      </div>
    )
  }

  const getRiskColor = (risk) => {
    if (risk === 'Low') return '#10b981'
    if (risk === 'Moderate') return '#f59e0b'
    return '#ef4444'
  }

  const getRiskBgColor = (risk) => {
    if (risk === 'Low') return '#dcfce7'
    if (risk === 'Moderate') return '#fef3c7'
    return '#fee2e2'
  }

  return (
    <div className="app-container">
      <header style={{padding:'20px',borderBottom:'1px solid var(--border-color)'}}>
        <button className="btn-back" onClick={() => navigate(-1)} style={{marginBottom:'12px'}}>←</button>
        <h1 style={{margin:'0 0 4px',fontSize:'1.5rem'}}>
          Screening Analysis
        </h1>
        <p style={{margin:0,fontSize:'0.8rem',color:'var(--text-secondary)'}}>{device?.name}</p>
      </header>

      <div style={{padding:'20px',flex:1,overflow:'auto'}}>
        {/* Risk Badge */}
        <div style={{
          width:'100%', padding:'20px', marginBottom:'20px',
          backgroundColor:getRiskBgColor(analysis.overallRisk),
          borderRadius:'12px', borderLeft:`4px solid ${getRiskColor(analysis.overallRisk)}`
        }}>
          <div style={{fontSize:'0.75rem',color:'var(--text-secondary)',marginBottom:'8px'}}>Overall Risk</div>
          <div style={{fontSize:'1.75rem',fontWeight:700,color:getRiskColor(analysis.overallRisk)}}>{analysis.overallRisk}</div>
        </div>

        {/* Confidence Score */}
        <div className="card" style={{marginBottom:'20px',padding:'16px'}}>
          <div style={{fontSize:'0.75rem',color:'var(--text-secondary)',marginBottom:'8px'}}>Confidence Score</div>
          <div style={{fontSize:'2rem',fontWeight:700,color:'var(--primary)',marginBottom:'6px'}}>{analysis.confidenceScore}%</div>
          <div style={{width:'100%',height:'4px',backgroundColor:'rgba(13,115,119,0.1)',borderRadius:'2px',overflow:'hidden'}}>
            <div style={{width:`${analysis.confidenceScore}%`,height:'100%',backgroundColor:'var(--primary)'}}></div>
          </div>
        </div>

        {/* ==== OPTIHB: Show computed parameters ==== */}
        {deviceId === 'optihb' && results?.parameters && (
          <div style={{marginBottom:'20px'}}>
            <h3 style={{margin:'0 0 12px',fontSize:'1rem',fontWeight:600}}>Computed Parameters</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {results.parameters.map((param, idx) => (
                <div key={idx} className="card" style={{padding:'16px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                    <h4 style={{margin:0,fontSize:'0.95rem',fontWeight:600}}>{param.name}</h4>
                    <span className="badge badge-success">{param.statusText}</span>
                  </div>
                  <div style={{fontSize:'1.8rem',fontWeight:700,color:'var(--primary)',marginBottom:'4px'}}>
                    {param.value} <span style={{fontSize:'0.85rem',color:'var(--text-secondary)',fontWeight:400}}>{param.unit}</span>
                  </div>
                  <div style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Normal: {param.normalRange}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==== OROSCAN: Show oral health metrics ==== */}
        {deviceId === 'oroscan' && results && (
          <div style={{marginBottom:'20px'}}>
            <h3 style={{margin:'0 0 12px',fontSize:'1rem',fontWeight:600}}>Oral Health Metrics</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              {[
                { label: 'Cavity Risk', value: results.cavityRisk + '%', status: results.cavityStatus },
                { label: 'Gum Health', value: results.gumHealth + '%', status: results.gumStatus },
                { label: 'Plaque Index', value: results.plaqueIndex, status: results.plaqueStatus },
                { label: 'Health Score', value: results.healthScore, status: results.healthStatus }
              ].map((m, i) => (
                <div key={i} className="card" style={{padding:'16px'}}>
                  <div style={{fontSize:'0.75rem',color:'var(--text-secondary)',marginBottom:'8px'}}>{m.label}</div>
                  <div style={{fontSize:'1.5rem',fontWeight:700,color:'var(--primary)',marginBottom:'6px'}}>{m.value}</div>
                  <span className="badge badge-success">{m.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Findings */}
        {analysis.findings && analysis.findings.length > 0 && (
          <div style={{marginBottom:'20px'}}>
            <h3 style={{margin:'0 0 12px',fontSize:'1rem',fontWeight:600}}>Key Findings</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              {analysis.findings.map((finding, idx) => (
                <div key={idx} className="card" style={{padding:'16px'}}>
                  <div style={{fontSize:'0.75rem',color:'var(--text-secondary)',marginBottom:'8px'}}>{finding.label}</div>
                  <div style={{fontSize:'1.1rem',fontWeight:700,color:'var(--primary)'}}>{finding.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation */}
        {analysis.recommendation && (
          <div style={{
            borderLeft:'4px solid var(--primary)', backgroundColor:'#f0fdfa',
            padding:'16px', borderRadius:'8px', marginBottom:'20px'
          }}>
            <h3 style={{margin:'0 0 12px',fontSize:'1rem',fontWeight:600}}>Recommendation</h3>
            <p style={{margin:0,fontSize:'0.9rem',color:'var(--text-secondary)',lineHeight:1.6}}>{analysis.recommendation}</p>
          </div>
        )}

        {/* Scan Details */}
        <div style={{backgroundColor:'var(--bg-secondary)',padding:'16px',borderRadius:'8px',marginBottom:'20px'}}>
          <h3 style={{margin:'0 0 12px',fontSize:'0.95rem',fontWeight:600}}>Scan Details</h3>
          <div style={{display:'flex',flexDirection:'column',gap:'8px',fontSize:'0.85rem'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <span style={{color:'var(--text-secondary)'}}>Device:</span>
              <span style={{fontWeight:600}}>{device?.name}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <span style={{color:'var(--text-secondary)'}}>Timestamp:</span>
              <span style={{fontWeight:600}}>{results ? formatDate(new Date(results.timestamp)) : '–'}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <span style={{color:'var(--text-secondary)'}}>Method:</span>
              <span style={{fontWeight:600}}>{results?.measurementMethod || 'Automated Analysis'}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:'20px',borderTop:'1px solid var(--border-color)',display:'flex',flexDirection:'column',gap:'12px'}}>
        <button className="btn btn-primary btn-full" onClick={() => navigate(`/report/${deviceId}`)}>
          Generate Report
        </button>
        <button className="btn btn-secondary btn-full" onClick={() => navigate(`/results/${deviceId}`)}>
          View Raw Data
        </button>
      </div>
    </div>
  )
}
