import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Booking.css';
import { CalendarIcon, ClockIcon, MessageSquare, Check, ChevronDown } from 'lucide-react';
import config from './config';
import { AuthContext } from '../context/AuthProvider';
import {Link} from'react-router-dom'

const Booking = () => {
  const [formData, setFormData] = useState({
    date: new Date(),
    time: '09:00 AM',
    service: '',
    comments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {user} =useContext(AuthContext)
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    'Consultation',
    'Check-up',
    'Treatment',
    'Follow-up',
    'Specialized Service'
  ];

  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const formattedHour = hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    timeSlots.push(`${formattedHour}:00 ${ampm}`);
  }
  console.log(timeSlots)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);
    console.log(formData)
    
    try {
      const response = await fetch(`${config.gcpURL}/appointment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId:user.id ,...formData})
      });
      
      if (response.ok) {
        setSubmitted(true);
        setShowSuccessModal(true);
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setErrorMessage(error.message);
    } finally {
        console.log("Booking successful")
      setIsSubmitting(false);
    }
  };
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page-container">
      <div className="appointment-container">
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-section">
            <div className="form-group">
              <label>
                <CalendarIcon className="input-icon" size={18} />
                Date
              </label>
              <div className="input-wrapper">
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  className="date-picker"
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select date"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                <ClockIcon className="input-icon" size={18} />
                Time
              </label>
              <div className="select-wrapper">
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="time-select"
                >
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <ChevronDown className="select-icon" size={18} />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label>Service Type</label>
              <div className="select-wrapper">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="service-select"
                  required
                >
                  <option value="">Select a service...</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
                <ChevronDown className="select-icon" size={18} />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label>
                <MessageSquare className="input-icon" size={18} />
                Additional Notes
              </label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                className="comments-area"
                placeholder="Any special requests or requirements..."
                rows="4"
              />
            </div>
          </div>

          <div className="button-section">
            <button 
              type="submit" 
              className={`booking-button ${isSubmitting ? 'loading' : ''} ${submitted ? 'success' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading-spinner"></span>
              ) : submitted ? (
                <Check size={20} />
              ) : (
                <>
                <span className="button-text">Book Now</span>
                <span className="button-icon">→</span>
                </>

              )}
            </button>
            {errorMessage && (
              <div className="error-message">
                {/* <X size={16} /> */}
                {errorMessage}
              </div>
            )}
            <Link to="/prevbookings">
            <button type="button" className="view-bookings-button">
              View Bookings
            </button>
            </Link>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <div className="success-icon">
                <Check size={32} />
              </div>
              <h3>Booking Confirmed!</h3>
              <p>Your appointment has been successfully scheduled.</p>
              <p className="appointment-details">
                Date: {formData.date.toLocaleDateString()}<br />
                Time: {formData.time}
              </p>
              <button onClick={closeSuccessModal} className="modal-close-button">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;