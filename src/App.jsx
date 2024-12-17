import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import Booking from './components/Booking'
import PrevBookings from './components/PrevBookings';
import HelpPage from './components/HelpPage';
const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<AuthPage />} />
          <Route exact path="/help" element={<HelpPage />} />
          <Route exact path="/prevbookings" element={<ProtectedRoute><PrevBookings/></ProtectedRoute>} />
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