import { randomInRange, roundTo } from '../utils/helpers'

/**
 * Generate OroScan results — always in SAFE range for demo
 */
export const generateOroScanResults = () => {
  return {
    device: 'OroScan',
    timestamp: new Date().toISOString(),
    images: {
      optical1: './images/oroscan/optical1.jpeg',
      optical2: './images/oroscan/optical2.jpeg',
      thermal1: './images/oroscan/thermal1.jpeg',
      thermal2: './images/oroscan/thermal2.jpeg'
    },
    healthScore: roundTo(randomInRange(85, 96), 1),
    healthStatus: 'Excellent',
    cavityRisk: roundTo(randomInRange(5, 18), 1),
    cavityStatus: 'Low',
    gumHealth: roundTo(randomInRange(82, 95), 1),
    gumStatus: 'Healthy',
    plaqueIndex: roundTo(randomInRange(8, 22), 1),
    plaqueStatus: 'Minimal',
    recommendations: [
      'Oral cavity appears healthy — no abnormalities detected',
      'Continue regular dental check-ups every 6 months',
      'Maintain oral hygiene with brushing and flossing',
      'No immediate intervention required'
    ]
  }
}

/**
 * Generate HemoCube results — always in NORMAL range for demo
 * Normal Hb: Male 13.5-17.5, Female 12.0-15.5, safe middle range used
 */
export const generateHemoCubeResults = () => {
  const hemoglobin = roundTo(randomInRange(13.0, 15.5), 1)

  return {
    device: 'HemoCube',
    timestamp: new Date().toISOString(),
    hemoglobin: hemoglobin,
    unit: 'g/dL',
    normalRange: '12.0 - 16.5 g/dL',
    status: 'Normal',
    statusClass: 'normal',
    stripImage: './images/hemocube/hemocube1.jpeg',
    stripImage2: './images/hemocube/hemocube2.jpeg',
    measurementMethod: 'Colorimetric strip analysis',
    timestamp_measured: new Date().toLocaleTimeString(),
    recommendations: [
      'Hemoglobin level is within normal range',
      'No signs of anemia detected',
      'Maintain balanced diet with iron-rich foods',
      'Routine follow-up in 3-6 months recommended'
    ]
  }
}

/**
 * Generate OptiHB results — always in NORMAL/SAFE range for demo
 */
export const generateOptiHBResults = () => {
  const hemoglobin = roundTo(randomInRange(13.0, 15.5), 1)
  const glucose = roundTo(randomInRange(85, 110), 0)
  const bilirubin = roundTo(randomInRange(0.3, 0.9), 2)
  const spo2 = roundTo(randomInRange(96, 99), 0)
  const heartRate = roundTo(randomInRange(68, 82), 0)

  return {
    device: 'OptiHB',
    timestamp: new Date().toISOString(),
    parameters: [
      {
        name: 'Hemoglobin',
        value: hemoglobin,
        unit: 'g/dL',
        normalRange: '12.0 - 16.5',
        status: 'normal',
        statusText: 'Normal'
      },
      {
        name: 'Blood Glucose',
        value: glucose,
        unit: 'mg/dL',
        normalRange: '70 - 140',
        status: 'normal',
        statusText: 'Normal'
      },
      {
        name: 'Bilirubin',
        value: bilirubin,
        unit: 'mg/dL',
        normalRange: '0.1 - 1.2',
        status: 'normal',
        statusText: 'Normal'
      },
      {
        name: 'SpO2',
        value: spo2,
        unit: '%',
        normalRange: '95 - 100',
        status: 'normal',
        statusText: 'Normal'
      },
      {
        name: 'Heart Rate',
        value: heartRate,
        unit: 'bpm',
        normalRange: '60 - 100',
        status: 'normal',
        statusText: 'Normal'
      }
    ],
    measurementMethod: 'Non-invasive optical spectroscopy',
    qualityIndicator: 'Excellent',
    recommendations: [
      'All parameters within normal physiological range',
      'Hemoglobin level indicates no anemia',
      'Blood glucose within healthy fasting range',
      'Bilirubin level normal — liver function appears healthy',
      'Oxygen saturation is optimal',
      'Follow-up screening recommended in 3-6 months'
    ]
  }
}

/**
 * Generate analysis results — always LOW risk for demo
 */
export const generateAIAnalysis = (device) => {
  const analyses = {
    oroscan: {
      overallRisk: 'Low',
      confidenceScore: roundTo(randomInRange(93, 98), 1),
      findings: [
        { label: 'Lesion Detection', value: 'None detected' },
        { label: 'Mucosal Health', value: 'Normal' },
        { label: 'Gum Condition', value: 'Healthy' },
        { label: 'Tissue Color', value: 'Normal' }
      ],
      recommendation: 'No abnormalities detected. Routine follow-up recommended in 6 months.'
    },
    hemocube: {
      overallRisk: 'Low',
      confidenceScore: roundTo(randomInRange(95, 99), 1),
      findings: [
        { label: 'Anemia Risk', value: 'Not detected' },
        { label: 'Iron Status', value: 'Adequate' },
        { label: 'Blood Quality', value: 'Normal' },
        { label: 'Measurement Quality', value: 'Excellent' }
      ],
      recommendation: 'Hemoglobin within normal limits. Continue routine monitoring every 3-6 months.'
    },
    optihb: {
      overallRisk: 'Low',
      confidenceScore: roundTo(randomInRange(94, 98), 1),
      findings: [
        { label: 'Anemia Risk', value: 'Not detected' },
        { label: 'Glucose Control', value: 'Normal' },
        { label: 'Liver Function', value: 'Normal' },
        { label: 'Oxygenation', value: 'Optimal' },
        { label: 'Cardiac Rhythm', value: 'Regular' },
        { label: 'Overall Health', value: roundTo(randomInRange(88, 96), 1) + '/100' }
      ],
      recommendation: 'All 5 biomarkers within healthy physiological range. No abnormalities detected. Routine follow-up recommended in 3-6 months.'
    }
  }

  return analyses[device] || analyses.hemocube
}
