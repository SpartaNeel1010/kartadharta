// App.js
import React, { useState } from 'react';
import { Person, Lock, Email, Phone, Home, LocationOn } from '@mui/icons-material';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    zipCode: '',
    password: '',
    verifyPassword: ''
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name is too short' : '';
      case 'email':
        return !/\S+@\S+\.\S+/.test(value) ? 'Invalid email address' : '';
      case 'phone':
        return !/^\d{10}$/.test(value.replace(/\D/g, '')) ? 'Invalid phone number' : '';
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters' : '';
      case 'verifyPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      case 'zipCode':
        return !/^\d{5}(-\d{4})?$/.test(value) ? 'Invalid ZIP code' : '';
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, formData[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!isLogin || (key === 'email' || key === 'password')) {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`/api/${isLogin ? 'login' : 'signup'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Success!');
      } else {
        console.error('Failed to submit');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getInputStatus = (fieldName) => {
    if (!touched[fieldName]) return '';
    return errors[fieldName] ? 'error' : 'success';
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="button-container">
          <button 
            className={`mode-button ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </button>
          <button 
            className={`mode-button ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            SIGN UP
          </button>
        </div>
      </div>
      
      <div className="right-panel">
        {/* <img src="/nike-logo.png" alt="Nike" className="logo" /> */}
        <form onSubmit={handleSubmit} className="form">
          {!isLogin && (
            <div className={`input-group ${getInputStatus('name')}`}>
              <Person className="icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="input-line"></div>
              {errors.name && touched.name && <span className="error">{errors.name}</span>}
            </div>
          )}

          <div className={`input-group ${getInputStatus('email')}`}>
            <Email className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="input-line"></div>
            {errors.email && touched.email && <span className="error">{errors.email}</span>}
          </div>

          {!isLogin && (
            <>
              <div className={`input-group ${getInputStatus('phone')}`}>
                <Phone className="icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="input-line"></div>
                {errors.phone && touched.phone && <span className="error">{errors.phone}</span>}
              </div>

              <div className={`input-group ${getInputStatus('address1')}`}>
                <Home className="icon" />
                <input
                  type="text"
                  name="address1"
                  placeholder="Address Line 1"
                  value={formData.address1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="input-line"></div>
              </div>

              <div className={`input-group ${getInputStatus('address2')}`}>
                <Home className="icon" />
                <input
                  type="text"
                  name="address2"
                  placeholder="Address Line 2"
                  value={formData.address2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="input-line"></div>
              </div>

              <div className={`input-group ${getInputStatus('zipCode')}`}>
                <LocationOn className="icon" />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="input-line"></div>
                {errors.zipCode && touched.zipCode && <span className="error">{errors.zipCode}</span>}
              </div>
            </>
          )}

          <div className={`input-group ${getInputStatus('password')}`}>
            <Lock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="input-line"></div>
            {errors.password && touched.password && <span className="error">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className={`input-group ${getInputStatus('verifyPassword')}`}>
              <Lock className="icon" />
              <input
                type="password"
                name="verifyPassword"
                placeholder="Verify Password"
                value={formData.verifyPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="input-line"></div>
              {errors.verifyPassword && touched.verifyPassword && (
                <span className="error">{errors.verifyPassword}</span>
              )}
            </div>
          )}

          <button type="submit" className="submit-button">
            {isLogin ? 'LOGIN' : 'SIGN UP'}
          </button>

          

        </form>
      </div>
    </div>
  );
};

export default AuthPage;