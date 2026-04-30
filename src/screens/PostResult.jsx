import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDeviceById } from '../data/devices'
import { formatDate } from '../utils/helpers'

// Base64 logos for embedding in HTML report
const IITKGP_LOGO_B64 = 'data:image/png;base64,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'
const CRTDH_LOGO_B64 = 'data:image/png;base64,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'

// Share Icon
const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
    <polyline points="16 6 12 2 8 6"/>
    <line x1="12" y1="2" x2="12" y2="15"/>
  </svg>
)

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
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:2px solid #0d7377">
        <div style="display:flex;align-items:center;gap:12px">
          <img src="${IITKGP_LOGO_B64}" alt="IIT Kharagpur" style="height:48px;width:auto"/>
          <img src="${CRTDH_LOGO_B64}" alt="CRTDH" style="height:48px;width:auto"/>
        </div>
        <div style="text-align:right">
          <div style="font-size:18px;font-weight:700;color:#0d7377">SC Lab</div>
          <div style="font-size:11px;color:#64748b">Point-of-Care Screening Report</div>
        </div>
      </div>
      <p style="font-size:12px;color:#64748b;margin-top:0">IIT Kharagpur | CRTDH | Generated: ${formatDate()}</p>

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

  const handleShareReport = async () => {
    // Build plain text summary for sharing
    let text = `SC Lab – Screening Report\n`
    text += `Generated: ${formatDate()}\n\n`

    if (patient) {
      text += `Patient: ${patient.name} (${patient.id})\n`
      text += `Age/Sex: ${patient.age} / ${patient.sex}\n\n`
    }

    text += `Device: ${device?.name}\n\n`

    if (results?.hemoglobin) {
      text += `Hemoglobin: ${results.hemoglobin} g/dL (${results.status})\n`
    }
    if (results?.healthScore) {
      text += `Health Score: ${results.healthScore} (${results.healthStatus})\n`
      text += `Cavity Risk: ${results.cavityRisk}% (${results.cavityStatus})\n`
      text += `Gum Health: ${results.gumHealth}% (${results.gumStatus})\n`
    }
    if (results?.parameters) {
      results.parameters.forEach(p => {
        text += `${p.name}: ${p.value} ${p.unit} (${p.statusText})\n`
      })
    }

    if (analysis) {
      text += `\nRisk: ${analysis.overallRisk} | Confidence: ${analysis.confidenceScore}%\n`
      text += `Recommendation: ${analysis.recommendation}\n`
    }

    text += `\n– SC Lab | IIT Kharagpur – CRTDH`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SC Lab – Screening Report',
          text: text
        })
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err)
        }
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(text)
        alert('Report copied to clipboard')
      } catch {
        alert('Sharing is not supported on this device')
      }
    }
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
        <div style={{display:'flex',gap:'12px'}}>
          <button
            className="btn btn-primary btn-full"
            onClick={handleDownloadReport}
            style={{flex:1}}
          >
            Download Report
          </button>
          <button
            onClick={handleShareReport}
            style={{
              width:48,height:48,borderRadius:12,border:'1.5px solid var(--primary)',
              background:'transparent',color:'var(--primary)',cursor:'pointer',
              display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
              transition:'all var(--transition-fast)'
            }}
            title="Share Report"
          >
            <ShareIcon />
          </button>
        </div>
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
