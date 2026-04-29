/**
 * Medical Device Data for SC Lab
 * Contains device information and available units
 */

export const devices = {
  oroscan: {
    id: 'oroscan',
    name: 'OroScan',
    description: 'Imaging based oral health screening',
    icon: '🦷',
    color: '#1a73e8',
    units: [
      { id: 'OS-001', name: 'OroScan Unit 1', active: true },
      { id: 'OS-002', name: 'OroScan Unit 2', active: false },
      { id: 'OS-003', name: 'OroScan Unit 3', active: false }
    ]
  },
  hemocube: {
    id: 'hemocube',
    name: 'HemoCube',
    description: 'Minimal invasive hemoglobin measurement device',
    icon: '🩸',
    color: '#ea4335',
    units: [
      { id: 'HC-001', name: 'HemoCube Unit 1', active: true },
      { id: 'HC-002', name: 'HemoCube Unit 2', active: false }
    ]
  },
  optihb: {
    id: 'optihb',
    name: 'OptiHB',
    description: 'Non-invasive device - Detect hemoglobin, glucose, and bilirubin',
    icon: '💡',
    color: '#fbbc04',
    units: [
      { id: 'OH-001', name: 'OptiHB Unit 1', active: true },
      { id: 'OH-002', name: 'OptiHB Unit 2', active: false }
    ]
  }
}

/**
 * Get all devices as array
 */
export const getAllDevices = () => {
  return Object.values(devices)
}

/**
 * Get device by ID
 */
export const getDeviceById = (deviceId) => {
  return devices[deviceId] || null
}

/**
 * Get active units for a device
 */
export const getActiveUnits = (deviceId) => {
  const device = getDeviceById(deviceId)
  if (!device) return []
  return device.units.filter(unit => unit.active)
}

/**
 * Get all units for a device
 */
export const getAllUnits = (deviceId) => {
  const device = getDeviceById(deviceId)
  if (!device) return []
  return device.units
}

/**
 * Get unit by ID
 */
export const getUnitById = (deviceId, unitId) => {
  const device = getDeviceById(deviceId)
  if (!device) return null
  return device.units.find(unit => unit.id === unitId) || null
}
