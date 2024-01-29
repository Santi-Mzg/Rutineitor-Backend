import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { AuthProvider } from './context/AuthContext';
import { WorkoutProvider } from './context/WorkoutContext'
import ProtectedRoute from './ProtectedRoute';

function App() {

  return (
    <AuthProvider>
      <WorkoutProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute/>}>
              <Route path="/workout" element={<MainPage />} />
              <Route path="/workout/:date" element={<MainPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WorkoutProvider>
    </AuthProvider>
  )
}

export default App
