import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Splash from './screens/Splash'
import Onboarding from './screens/Onboarding'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import PatientRegistration from './screens/PatientRegistration'
import WiFiConnect from './screens/WiFiConnect'
import DataCapture from './screens/DataCapture'
import Results from './screens/Results'
import Analysis from './screens/Analysis'
import PostResult from './screens/PostResult'
import History from './screens/History'

function ProtectedRoute({ children }) {
  const auth = localStorage.getItem('sclab_auth')
  if (!auth) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/register/:deviceId" element={<ProtectedRoute><PatientRegistration /></ProtectedRoute>} />
        <Route path="/wifi/:deviceId" element={<ProtectedRoute><WiFiConnect /></ProtectedRoute>} />
        <Route path="/capture/:deviceId" element={<ProtectedRoute><DataCapture /></ProtectedRoute>} />
        <Route path="/results/:deviceId" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/analysis/:deviceId" element={<ProtectedRoute><Analysis /></ProtectedRoute>} />
        <Route path="/report/:deviceId" element={<ProtectedRoute><PostResult /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
