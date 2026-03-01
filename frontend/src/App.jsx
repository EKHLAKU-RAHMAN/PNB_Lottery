import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { SocketProvider } from './context/SocketContext'
import LandingPage from './pages/LandingPage'
import AdminPanel from './pages/AdminPanel'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </SocketProvider>
    </AuthProvider>
  )
}

export default App
