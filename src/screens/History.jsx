import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../utils/helpers'

const deviceColors = {
  oroscan: { bg: '#e0f2f1', text: '#0d7377' },
  hemocube: { bg: '#fef2f2', text: '#dc2626' },
  optihb: { bg: '#fefce8', text: '#d97706' }
}

export default function History() {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('sclab_history') || '[]')
    setHistory(data)
  }, [])

  const clearHistory = () => {
    if (window.confirm('Clear all screening history?')) {
      localStorage.removeItem('sclab_history')
      setHistory([])
    }
  }

  return (
    <div className="app-container">
      <header style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 600 }}>Screening History</h1>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {history.length} {history.length === 1 ? 'record' : 'records'}
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              style={{
                background: 'transparent', border: '1px solid #fca5a5', color: '#dc2626',
                padding: '6px 12px', borderRadius: 8, fontSize: '0.8rem', cursor: 'pointer'
              }}
            >
              Clear
            </button>
          )}
        </div>
      </header>

      <div style={{ padding: '20px', flex: 1, overflow: 'auto' }}>
        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 16, opacity: 0.3 }}>
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" fill="#94a3b8"/>
            </svg>
            <h3 style={{ color: 'var(--text-secondary)', fontWeight: 500, margin: '0 0 8px' }}>No screening history</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
              Completed screenings will appear here
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {history.map((entry, idx) => {
              const colors = deviceColors[entry.deviceId] || deviceColors.hemocube
              const patient = entry.patient || {}
              const results = entry.results || {}
              const analysis = entry.analysis || {}

              // Summary value based on device
              let summaryLabel = ''
              let summaryValue = ''
              if (entry.deviceId === 'oroscan') {
                summaryLabel = 'Health Score'
                summaryValue = results.healthScore ? `${results.healthScore}` : '—'
              } else if (entry.deviceId === 'hemocube') {
                summaryLabel = 'Hemoglobin'
                summaryValue = results.hemoglobin ? `${results.hemoglobin} g/dL` : '—'
              } else if (entry.deviceId === 'optihb') {
                const hb = results.parameters?.find(p => p.name === 'Hemoglobin')
                summaryLabel = 'Hemoglobin'
                summaryValue = hb ? `${hb.value} g/dL` : '—'
              }

              return (
                <div key={idx} style={{
                  background: '#fff', borderRadius: 14, padding: '16px',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}>
                  {/* Top: device badge + date */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: 8,
                      background: colors.bg, color: colors.text,
                      fontSize: '0.75rem', fontWeight: 600
                    }}>
                      {results.device || entry.deviceId}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {entry.date ? formatDate(new Date(entry.date)) : '—'}
                    </span>
                  </div>

                  {/* Patient info */}
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1e293b' }}>
                      {patient.name || 'Unknown Patient'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 2 }}>
                      {patient.id} · Age {patient.age} · {patient.sex}
                    </div>
                  </div>

                  {/* Result summary */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: '#f7f9fc', borderRadius: 10, padding: '10px 14px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: 2 }}>{summaryLabel}</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0d7377' }}>{summaryValue}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {analysis.overallRisk && (
                        <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                          {analysis.overallRisk} Risk
                        </span>
                      )}
                      <span style={{ color: '#94a3b8', fontSize: '1.2rem' }}>›</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
