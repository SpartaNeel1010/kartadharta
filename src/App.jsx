import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;