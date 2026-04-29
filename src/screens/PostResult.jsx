import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDeviceById } from '../data/devices'
import { formatDate } from '../utils/helpers'

// Success Checkmark Icon
const CheckmarkIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
  </svg>
)

export default function PostResult() {
  const navigate = useNavigate()
  const { deviceId } = useParams()
  const device = getDeviceById(deviceId)
  const [patient, setPatient] = useState(null)
  const [results, setResults] = useState(null)
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    const p = localStorage.getItem('sclab_current_patient')
    const r = localStorage.getItem('sclab_last_result')
    const a = localStorage.getItem('sclab_last_analysis')
    if (p) setPatient(JSON.parse(p))
    if (r) setResults(JSON.parse(r))
    if (a) setAnalysis(JSON.parse(a))

    // Save to history
    if (r) {
      const history = JSON.parse(localStorage.getItem('sclab_history') || '[]')
      const entry = {
        patient: p ? JSON.parse(p) : {},
        results: JSON.parse(r),
        analysis: a ? JSON.parse(a) : {},
        deviceId,
        date: new Date().toISOString()
      }
      history.unshift(entry)
      localStorage.setItem('sclab_history', JSON.stringify(history.slice(0, 50)))
    }
  }, [deviceId])

  const handleDownloadReport = () => {
    const w = window.open('', '_blank')
    w.document.write(`
      <!DOCTYPE html><html><head><title>SC Lab Report</title>
      <style>
        body{font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1e293b}
        h1{color:#0d7377;font-size:20px;border-bottom:2px solid #0d7377;padding-bottom:8px}
        h2{font-size:15px;color:#0d7377;margin-top:20px}
        .row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #e2e8f0;font-size:13px}
        .label{color:#64748b} .value{font-weight:600;color:#1e293b}
        .badge{display:inline-block;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:600}
        .normal{background:#dcfce7;color:#166534} .warning{background:#fef3c7;color:#92400e} .danger{background:#fee2e2;color:#991b1b}
        .footer{margin-top:30px;text-align:center;font-size:11px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:12px}
        @media print{body{padding:0}}
      </style></head><body>
      <h1>SC Lab - Screening Report</h1>
      <p style="font-size:12px;color:#64748b">IIT Kharagpur | CRTDH | Generated: ${formatDate()}</p>

      <h2>Patient Information</h2>
      ${patient ? `
        <div class="row"><span class="label">Patient ID</span><span class="value">${patient.id}</span></div>
        <div class="row"><span class="label">Name</span><span class="value">${patient.name}</span></div>
        <div class="row"><span class="label">Age / Sex</span><span class="value">${patient.age} / ${patient.sex}</span></div>
        <div class="row"><span class="label">Address</span><span class="value">${patient.address}, ${patient.pinCode}</span></div>
      ` : '<p>N/A</p>'}

      <h2>Device: ${device?.name || deviceId}</h2>
      <div class="row"><span class="label">Device</span><span class="value">${device?.name}</span></div>
      <div class="row"><span class="label">Description</span><span class="value">${device?.description}</span></div>

      <h2>Results</h2>
      ${results?.hemoglobin ? `
        <div class="row"><span class="label">Hemoglobin</span><span class="value">${results.hemoglobin} g/dL <span class="badge ${results.status === 'Normal' ? 'normal' : 'warning'}">${results.status}</span></span></div>
        <div class="row"><span class="label">Normal Range</span><span class="value">${results.normalRange}</span></div>
      ` : ''}
      ${results?.healthScore ? `
        <div class="row"><span class="label">Health Score</span><span class="value">${results.healthScore} (${results.healthStatus})</span></div>
        <div class="row"><span class="label">Cavity Risk</span><span class="value">${results.cavityRisk}% (${results.cavityStatus})</span></div>
        <div class="row"><span class="label">Gum Health</span><span class="value">${results.gumHealth}% (${results.gumStatus})</span></div>
      ` : ''}
      ${results?.parameters ? results.parameters.map(p => `
        <div class="row"><span class="label">${p.name}</span><span class="value">${p.value} ${p.unit} <span class="badge ${p.statusText === 'Normal' ? 'normal' : 'warning'}">${p.statusText}</span></span></div>
      `).join('') : ''}

      ${analysis ? `
        <h2>Analysis</h2>
        <div class="row"><span class="label">Overall Risk</span><span class="value">${analysis.overallRisk}</span></div>
        <div class="row"><span class="label">Confidence</span><span class="value">${analysis.confidenceScore}%</span></div>
        <div class="row"><span class="label">Recommendation</span><span class="value">${analysis.recommendation}</span></div>
      ` : ''}

      <div class="footer">
        SC Lab | Point-of-Care Screening Platform | IIT Kharagpur - CRTDH<br/>
        This is a demo report generated for screening purposes.
      </div>
      </body></html>
    `)
    w.document.close()
    w.print()
  }

  return (
    <div className="app-container">
      <div style={{padding:'40px 20px',textAlign:'center',flex:1,overflow:'auto'}}>
        {/* Success Checkmark in Teal Circle */}
        <div style={{
          width:'120px',height:'120px',borderRadius:'50%',backgroundColor:'#0d7377',
          display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px',color:'#fff'
        }}>
          <CheckmarkIcon />
        </div>

        <h1 style={{margin:'0 0 8px',fontSize:'1.5rem',fontWeight:700,color:'var(--text-primary)'}}>Screening Complete</h1>
        <p style={{margin:'0 0 24px',fontSize:'0.9rem',color:'var(--text-secondary)'}}>Results have been saved successfully</p>

        {/* Patient Details Card */}
        {patient && (
          <div className="card" style={{marginBottom:'16px',padding:'16px',textAlign:'left'}}>
            <h3 style={{margin:'0 0 12px',fontSize:'0.95rem',fontWeight:600,color:'var(--text-primary)'}}>Patient Details</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px 16px',fontSize:'0.85rem'}}>
              <div><span style={{color:'var(--text-secondary)'}}>ID:</span><div style={{fontWeight:600}}>{patient.id}</div></div>
              <div><span style={{color:'var(--text-secondary)'}}>Name:</span><div style={{fontWeight:600}}>{patient.name}</div></div>
              <div><span style={{color:'var(--text-secondary)'}}>Age:</span><div style={{fontWeight:600}}>{patient.age}</div></div>
              <div><span style={{color:'var(--text-secondary)'}}>Sex:</span><div style={{fontWeight:600}}>{patient.sex}</div></div>
            </div>
          </div>
        )}

        {/* Results Summary Card */}
        <div className="card" style={{marginBottom:'24px',padding:'16px',textAlign:'left'}}>
          <h3 style={{margin:'0 0 12px',fontSize:'0.95rem',fontWeight:600,color:'var(--text-primary)'}}>Results Summary</h3>
          <div style={{fontSize:'0.85rem',display:'flex',flexDirection:'column',gap:'8px'}}>
            {results?.hemoglobin && (
              <div>
                <span style={{color:'var(--text-secondary)'}}>Hemoglobin:</span>
                <div style={{fontWeight:600}}>{results.hemoglobin} g/dL <span style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>({results.status})</span></div>
              </div>
            )}
            {results?.healthScore && (
              <>
                <div>
                  <span style={{color:'var(--text-secondary)'}}>Health Score:</span>
                  <div style={{fontWeight:600}}>{results.healthScore} ({results.healthStatus})</div>
                </div>
                <div>
                  <span style={{color:'var(--text-secondary)'}}>Cavity Risk:</span>
                  <div style={{fontWeight:600}}>{results.cavityRisk}% ({results.cavityStatus})</div>
                </div>
                <div>
                  <span style={{color:'var(--text-secondary)'}}>Gum Health:</span>
                  <div style={{fontWeight:600}}>{results.gumHealth}% ({results.gumStatus})</div>
                </div>
              </>
            )}
            {results?.parameters && results.parameters.map((p,i) => (
              <div key={i}>
                <span style={{color:'var(--text-secondary)'}}>{p.name}:</span>
                <div style={{fontWeight:600}}>{p.value} {p.unit} <span style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>({p.statusText})</span></div>
              </div>
            ))}
            {analysis && (
              <>
                <div style={{marginTop:'8px',paddingTop:'8px',borderTop:'1px solid var(--border-color)'}}>
                  <span style={{color:'var(--text-secondary)'}}>Risk Level:</span>
                  <div style={{fontWeight:600}}>{analysis.overallRisk} <span style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>Confidence: {analysis.confidenceScore}%</span></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons - Stacked */}
      <div style={{padding:'20px',borderTop:'1px solid var(--border-color)',display:'flex',flexDirection:'column',gap:'12px'}}>
        <button
          className="btn btn-primary btn-full"
          onClick={handleDownloadReport}
        >
          Download Report
        </button>
        <button
          className="btn btn-secondary btn-full"
          onClick={() => navigate(`/register/${deviceId}`)}
        >
          New Screening
        </button>
        <button
          className="btn btn-full"
          onClick={() => navigate('/dashboard')}
          style={{background:'transparent',color:'var(--primary)',border:'1.5px solid var(--primary)',padding:'12px',borderRadius:'8px',fontSize:'0.95rem',fontWeight:600,cursor:'pointer',transition:'all var(--transition-fast)'}}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}
