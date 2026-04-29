import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDeviceById } from '../data/devices'
import { generateOroScanResults, generateHemoCubeResults, generateOptiHBResults } from '../data/results'
import { formatDate } from '../utils/helpers'

// Brain Icon
const BrainIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
  </svg>
)

// OptiHB CSV data (embedded from demo data)
const OPTIHB_CSV_HEADERS = ['Time(s)', '415', '445', '480', '515', '555', '590', '630', '680', 'Clear', 'NIR']
const OPTIHB_CSV_DATA = [
  [0.00, 2695, 4673, 6836, 13777, 23524, 41597, 51213, 29402, 65535, 7314],
  [0.60, 2757, 4779, 7004, 14297, 23714, 41643, 51173, 29396, 65535, 7322],
  [1.20, 2740, 4744, 6948, 14176, 23979, 41903, 51224, 29406, 65535, 7344],
  [1.80, 2762, 4790, 7017, 14342, 24498, 42439, 51558, 29534, 65535, 7410],
  [2.40, 2788, 4845, 7100, 14586, 24994, 42955, 51832, 29664, 65535, 7468],
  [3.00, 2808, 4893, 7161, 14753, 25215, 43120, 51927, 29709, 65535, 7494],
  [3.60, 2790, 4853, 7096, 14572, 24938, 42840, 51807, 29661, 65535, 7458],
  [4.20, 2782, 4835, 7067, 14495, 25065, 42959, 51874, 29686, 65535, 7475],
  [4.80, 2775, 4827, 7059, 14454, 24800, 42667, 51695, 29624, 65535, 7440],
  [5.40, 2754, 4780, 6990, 14270, 24466, 42256, 51419, 29514, 65535, 7388],
  [6.00, 2731, 4725, 6907, 14065, 24322, 42104, 51297, 29474, 65535, 7370],
  [6.60, 2717, 4698, 6867, 13954, 24120, 41915, 51210, 29445, 65535, 7350],
  [7.20, 2710, 4680, 6837, 13876, 24033, 41807, 51166, 29426, 65535, 7338],
  [7.80, 2710, 4691, 6849, 13899, 24251, 42075, 51340, 29473, 65535, 7366],
  [8.40, 2729, 4735, 6917, 14060, 24556, 42372, 51521, 29550, 65535, 7400],
  [9.00, 2732, 4749, 6926, 14093, 24432, 42237, 51453, 29557, 65535, 7392],
  [9.60, 2743, 4777, 6973, 14198, 24466, 42263, 51447, 29539, 65535, 7392],
  [10.20, 2751, 4806, 7014, 14302, 24441, 42169, 51378, 29506, 65535, 7378],
  [10.80, 2748, 4804, 7008, 14293, 24297, 41916, 51132, 29383, 65535, 7340],
  [11.40, 2749, 4811, 7014, 14320, 24177, 41745, 50988, 29353, 65535, 7323],
  [12.00, 2736, 4787, 6979, 14217, 23979, 41501, 50828, 29261, 65535, 7290],
  [12.60, 2739, 4797, 7001, 14255, 24094, 41612, 50895, 29310, 65535, 7302],
  [13.20, 2735, 4792, 6991, 14229, 24014, 41488, 50789, 29240, 65535, 7286],
  [13.80, 2745, 4816, 7026, 14321, 23990, 41477, 50808, 29260, 65535, 7286],
  [14.40, 2737, 4794, 6995, 14235, 23900, 41398, 50782, 29276, 65535, 7279]
]

export default function Results() {
  const navigate = useNavigate()
  const { deviceId } = useParams()
  const [results, setResults] = useState(null)

  const device = getDeviceById(deviceId)

  useEffect(() => {
    let resultData
    if (deviceId === 'oroscan') {
      resultData = generateOroScanResults()
    } else if (deviceId === 'hemocube') {
      resultData = generateHemoCubeResults()
    } else if (deviceId === 'optihb') {
      resultData = generateOptiHBResults()
    }

    if (resultData) {
      localStorage.setItem('sclab_last_result', JSON.stringify(resultData))
      setResults(resultData)
    }
  }, [deviceId])

  if (!results) {
    return (
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading data...</p>
      </div>
    )
  }

  // ===== HEMOCUBE: Error – blank strip, no blood sample =====
  if (deviceId === 'hemocube') {
    return (
      <div className="app-container">
        <header style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
          <button className="btn-back" onClick={() => navigate('/dashboard')} style={{ marginBottom: '12px' }}>←</button>
          <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem' }}>{device?.name} Results</h1>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{formatDate(new Date(results.timestamp))}</p>
        </header>

        <div style={{ padding: '20px', flex: 1, overflow: 'auto' }}>
          {/* Strip images */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '2px solid #fca5a5' }}>
              <img src={results.stripImage} alt="Strip 1" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '2px solid #fca5a5' }}>
              <img src={results.stripImage2} alt="Strip 2" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>

          {/* Error card */}
          <div style={{
            padding: '24px', borderRadius: '14px', textAlign: 'center',
            background: '#fef2f2', border: '1.5px solid #fca5a5'
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', background: '#fee2e2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#dc2626"/>
              </svg>
            </div>
            <h2 style={{ margin: '0 0 8px', fontSize: '1.2rem', color: '#991b1b', fontWeight: 700 }}>
              Blood Sample Unavailable
            </h2>
            <p style={{ margin: '0 0 16px', fontSize: '0.9rem', color: '#b91c1c', lineHeight: 1.5 }}>
              The test strip appears blank. No blood sample was detected on the strip for hemoglobin measurement.
            </p>
            <div style={{
              background: '#fff', borderRadius: 10, padding: '12px', textAlign: 'left',
              fontSize: '0.85rem', color: '#64748b'
            }}>
              <p style={{ margin: '0 0 6px', fontWeight: 600, color: '#991b1b' }}>Possible causes:</p>
              <p style={{ margin: '0 0 4px' }}>- Insufficient blood on test strip</p>
              <p style={{ margin: '0 0 4px' }}>- Strip not properly prepared</p>
              <p style={{ margin: 0 }}>- Expired or damaged test strip</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            className="btn btn-primary btn-full"
            onClick={() => navigate(`/register/hemocube`)}
          >
            Retry with New Strip
          </button>
          <button
            className="btn btn-secondary btn-full"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  // ===== OROSCAN: Show fetched images =====
  if (deviceId === 'oroscan') {
    return (
      <div className="app-container">
        <header style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
          <button className="btn-back" onClick={() => navigate('/dashboard')} style={{ marginBottom: '12px' }}>←</button>
          <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem' }}>Device Data – {device?.name}</h1>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Fetched at {formatDate(new Date(results.timestamp))}
          </p>
        </header>

        <div style={{ padding: '20px', flex: 1, overflow: 'auto' }}>
          {/* Image grid */}
          <h3 style={{ margin: '0 0 12px', fontSize: '1rem', fontWeight: 600 }}>Captured Images</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            {[
              { label: 'Optical 1', src: results.images.optical1, borderColor: '#90caf9' },
              { label: 'Optical 2', src: results.images.optical2, borderColor: '#90caf9' },
              { label: 'Thermal 1', src: results.images.thermal1, borderColor: '#ffcc80' },
              { label: 'Thermal 2', src: results.images.thermal2, borderColor: '#ffcc80' }
            ].map((img, i) => (
              <div key={i} style={{
                borderRadius: '14px', overflow: 'hidden',
                border: `2px solid ${img.borderColor}`, position: 'relative'
              }}>
                <img src={img.src} alt={img.label}
                  style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                  padding: '8px', textAlign: 'center'
                }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#fff' }}>{img.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: '#f0fdfa', borderRadius: 10, padding: '14px',
            borderLeft: '4px solid #0d7377', fontSize: '0.85rem', color: '#0d7377'
          }}>
            4 images fetched successfully – 2 optical camera, 2 thermal camera. Click "View Analysis" for detailed screening results.
          </div>
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)' }}>
          <button
            className="btn btn-primary btn-full"
            onClick={() => navigate(`/analysis/${deviceId}`)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}
          >
            <BrainIcon /> View Analysis
          </button>
          <button className="btn btn-secondary btn-full" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  // ===== OPTIHB: Show raw CSV data in table =====
  return (
    <div className="app-container">
      <header style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
        <button className="btn-back" onClick={() => navigate('/dashboard')} style={{ marginBottom: '12px' }}>←</button>
        <h1 style={{ margin: '0 0 4px', fontSize: '1.5rem' }}>Device Data – {device?.name}</h1>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Spectral readings at {formatDate(new Date(results.timestamp))}
        </p>
      </header>

      <div style={{ padding: '20px', flex: 1, overflow: 'auto' }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 600 }}>Raw Spectral Data</h3>
        <p style={{ margin: '0 0 12px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Multi-wavelength optical readings (nm) over 14.4 seconds
        </p>

        {/* Scrollable table */}
        <div style={{
          overflow: 'auto', borderRadius: '12px',
          border: '1px solid #e2e8f0', marginBottom: '20px'
        }}>
          <table style={{
            width: '100%', borderCollapse: 'collapse',
            fontSize: '0.7rem', whiteSpace: 'nowrap'
          }}>
            <thead>
              <tr style={{ background: '#0d7377' }}>
                {OPTIHB_CSV_HEADERS.map((h, i) => (
                  <th key={i} style={{
                    padding: '8px 6px', color: '#fff', fontWeight: 600,
                    textAlign: 'right', borderBottom: '2px solid #0a5a63',
                    position: i === 0 ? 'sticky' : 'static',
                    left: 0, background: i === 0 ? '#0d7377' : 'transparent',
                    textAlign: i === 0 ? 'left' : 'right', zIndex: i === 0 ? 1 : 0
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {OPTIHB_CSV_DATA.map((row, ri) => (
                <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : '#f8fafc' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{
                      padding: '6px', borderBottom: '1px solid #f1f5f9',
                      textAlign: ci === 0 ? 'left' : 'right',
                      fontWeight: ci === 0 ? 600 : 400,
                      color: ci === 0 ? '#0d7377' : '#475569',
                      fontFamily: 'monospace',
                      position: ci === 0 ? 'sticky' : 'static',
                      left: 0, background: ci === 0 ? (ri % 2 === 0 ? '#fff' : '#f8fafc') : 'transparent',
                      zIndex: ci === 0 ? 1 : 0
                    }}>
                      {ci === 0 ? cell.toFixed(2) : cell.toLocaleString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{
          background: '#fefce8', borderRadius: 10, padding: '14px',
          borderLeft: '4px solid #d97706', fontSize: '0.85rem', color: '#92400e'
        }}>
          25 spectral readings captured across 10 wavelength channels. Click "View Analysis" to see computed hemoglobin, glucose, bilirubin, SpO2 and heart rate.
        </div>
      </div>

      <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)' }}>
        <button
          className="btn btn-primary btn-full"
          onClick={() => navigate(`/analysis/${deviceId}`)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}
        >
          <BrainIcon /> View Analysis
        </button>
        <button className="btn btn-secondary btn-full" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}
