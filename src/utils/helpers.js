/**
 * Generate patient ID with format: SCL-YYYYMMDD-XXXX
 * where XXXX is a random 4-digit number
 */
export const generatePatientId = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const randomNum = String(Math.floor(Math.random() * 10000)).padStart(4, '0')

  return `SCL-${year}${month}${day}-${randomNum}`
}

/**
 * Format date to readable string
 */
export const formatDate = (date = new Date()) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Intl.DateTimeFormat('en-IN', options).format(date)
}

/**
 * Get status color class based on status value
 */
export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'normal':
      return 'status-normal'
    case 'low':
      return 'status-low'
    case 'high':
      return 'status-high'
    case 'critical':
      return 'status-danger'
    default:
      return 'status-normal'
  }
}

/**
 * Generate random number in range
 */
export const randomInRange = (min, max) => {
  return Math.random() * (max - min) + min
}

/**
 * Round to specific decimal places
 */
export const roundTo = (value, decimals = 2) => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

/**
 * Delay promise for animations/timers
 */
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength (minimum 6 characters)
 */
export const isValidPassword = (password) => {
  return password.length >= 6
}

/**
 * Get greeting based on time of day
 */
export const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}
