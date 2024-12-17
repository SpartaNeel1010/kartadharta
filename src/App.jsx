import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import Booking from './components/Booking'
const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<AuthPage />} />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;