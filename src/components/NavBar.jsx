import React, { useState } from 'react';
import './NavBar.css';
import { Building2, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom"
const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <Link to="/"><div className="navbar-logo" style={{ textDecoration: 'none' }}>
                <img src={logo} alt="Logo" className="logo-image" />
                <span className="logo-text">Karta Dharta</span>
            </div></Link>

            <button className="menu-button" onClick={toggleMenu}>
                {isMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
            </button>

            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/register" className="register-link">Register As A Professional</Link>
                <Link to="/help">Help</Link>
                <Link to="/login">Login / Sign Up</Link>
            </div>
        </nav>
    );
};

export default NavBar;
