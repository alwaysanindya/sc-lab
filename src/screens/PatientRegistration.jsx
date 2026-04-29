import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { generatePatientId, delay } from '../utils/helpers'
import { getDeviceById } from '../data/devices'

export default function PatientRegistration() {
  const navigate = useNavigate()
  const { deviceId } = useParams()
  const device = getDeviceById(deviceId)
  const [patientId] = useState(() => generatePatientId())
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',
    address: '',
    pinCode: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!device) navigate('/dashboard')
  }, [device, navigate])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) > 120) newErrors.age = 'Valid age required'
    if (!formData.sex) newErrors.sex = 'Please select'
    if (formData.pinCode && formData.pinCode.length !== 6) newErrors.pinCode = 'Must be 6 digits'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    await delay(600)
    const patientData = {
      id: patientId,
      ...formData,
      age: parseInt(formData.age),
      deviceId,
      registeredAt: new Date().toISOString()
    }
    localStorage.setItem('sclab_current_patient', JSON.stringify(patientData))
    navigate(`/wifi/${deviceId}`)
  }

  if (!device) return null

  return (
    <div className="registration">
      <header className="registration-header">
        <button className="btn-back" onClick={() => navigate('/dashboard')}>←</button>
        <h1>Patient Registration</h1>
        <p style={{fontSize: '0.85rem', opacity: 0.7, marginTop: 4}}>
          {device.icon} {device.name} Screening
        </p>
      </header>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label className="form-label">Patient ID</label>
          <input
            type="text"
            className="input"
            value={patientId}
            readOnly
            style={{background: '#f0f4f8', fontFamily: 'monospace', fontWeight: 600}}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name *</label>
          <input
            id="name" type="text" name="name"
            className={`input ${errors.name ? 'input-error' : ''}`}
            placeholder="Enter patient name"
            value={formData.name} onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age" className="form-label">Age *</label>
            <input
              id="age" type="number" name="age"
              className={`input ${errors.age ? 'input-error' : ''}`}
              placeholder="Age" min="1" max="120"
              value={formData.age} onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.age && <span className="error-text">{errors.age}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="sex" className="form-label">Sex *</label>
            <select
              id="sex" name="sex"
              className={`select ${errors.sex ? 'input-error' : ''}`}
              value={formData.sex} onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
              <option value="others">Others</option>
            </select>
            {errors.sex && <span className="error-text">{errors.sex}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">Address <span style={{color:'#94a3b8',fontWeight:400,fontSize:'0.75rem'}}>(optional)</span></label>
          <textarea
            id="address" name="address" rows="2"
            className="input"
            placeholder="Enter address"
            value={formData.address} onChange={handleChange}
            disabled={isSubmitting}
            style={{resize: 'none'}}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pinCode" className="form-label">Pin Code <span style={{color:'#94a3b8',fontWeight:400,fontSize:'0.75rem'}}>(optional)</span></label>
          <input
            id="pinCode" type="text" name="pinCode"
            className={`input ${errors.pinCode ? 'input-error' : ''}`}
            placeholder="6-digit pin code" maxLength="6"
            value={formData.pinCode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 6)
              setFormData(prev => ({ ...prev, pinCode: val }))
              if (errors.pinCode) setErrors(prev => ({ ...prev, pinCode: '' }))
            }}
            disabled={isSubmitting}
          />
          {errors.pinCode && <span className="error-text">{errors.pinCode}</span>}
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={isSubmitting}
          style={{marginTop: 16}}
        >
          {isSubmitting ? 'Registering...' : 'Start Screening →'}
        </button>
      </form>
    </div>
  )
}
