import React, { useState } from 'react';
import './NavBar.css';
import { Building2, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <img src={logo} alt="Logo" className="logo-image" />
        <span className="logo-text">Karta Dharta</span>
      </div>
      
      <button className="menu-button" onClick={toggleMenu}>
        {isMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
      </button>
      
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <a href="/register" className="register-link">Register As A Professional</a>
        <a href="/help">Help</a>
        <a href="/login">Login / Sign Up</a>
      </div>
    </nav>
  );
};

export default NavBar;
