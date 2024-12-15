import React, { useState,useContext } from 'react';
import './NavBar.css';
import { Building2, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom"
import { AuthContext } from '../context/AuthProvider';


const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {checkLogin,logout}=useContext(AuthContext)


    const toggleMenu = () => {
        console.log("first")
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
                <Link to="/register" className="register-link" onClick={toggleMenu}>Register As A Professional</Link>
                <Link to="/help" onClick={toggleMenu}>Help</Link>
                {!checkLogin()? <Link to="/login" onClick={toggleMenu} >Login / Sign Up</Link>:
                                <Link to="/login" onClick={()=>{
                                    toggleMenu();
                                    logout();
                                }} >Logout</Link>
                
                }
            </div>
        </nav>
    );
};

export default NavBar;
