import React, { useContext, useEffect,useState } from 'react';
import './PrevBookings.css';
import { format } from 'date-fns';
import { AuthContext } from '../context/AuthProvider';
import config from './config';

const PrevBookings = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMMM dd, yyyy');
  };
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {user}=useContext(AuthContext)
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        
        // Replace with your actual API URL and user ID
        console.log(user)
        const userId=user.id // Get this from your auth context or props
        const response = await fetch(`${config.gcpURL}/appointment/${userId}`);
        const data = await response.json();
        
        if (data.success) {
          setAppointments(data.data);
        } else {
          setError(data.message || 'Failed to fetch appointments');
        }
      } catch (err) {
        setError('Error fetching appointments');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAppointments();
  }, []);

  return (
    <div className="appointments-dashboard">
      <div className="dashboard-header">
        <h1>Appointments</h1>
        <div className="header-stats">
          <div className="stat-box">
            <span className="stat-value">{appointments.length}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>

      <div className="appointments-grid">
        {console.log(appointments.length)}
        {appointments.length===0?<h4>No Previous Appointments</h4>:appointments.map((appointment) => (
          <div key={appointment._id} className="appointment-card">
            <div className="card-status-bar">
              <div className="status-indicator"></div>
            </div>

            <div className="card-header">
              <div className="service-badge">{appointment.service}</div>
              <div className="time-chip">{appointment.time}</div>
            </div>

            <div className="card-content">
              <div className="content-row">
                <span className="row-icon">📅</span>
                <div className="row-details">
                  <span className="detail-label">Appointment Date</span>
                  <span className="detail-value">{formatDate(appointment.date)}</span>
                </div>
              </div>

              <div className="content-row">
                <span className="row-icon">👤</span>
                <div className="row-details">
                  <span className="detail-label">User</span>
                  <span className="detail-value">{appointment.userId.name}</span>
                </div>
              </div>

              <div className="content-row">
                <span className="row-icon">✉️</span>
                <div className="row-details">
                  <span className="detail-label">Email</span>
                  <span className="detail-value email">{appointment.userId.email}</span>
                </div>
              </div>

              {appointment.comments && (
                <div className="content-row">
                  <span className="row-icon">💭</span>
                  <div className="row-details">
                    <span className="detail-label">Notes</span>
                    <span className="detail-value comments">{appointment.comments}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="card-footer">
              <div className="booking-info">
                <span className="booking-id">#{appointment._id.slice(-6)}</span>
                <span className="booking-date">
                  Created {format(new Date(appointment.createdAt), 'MMM dd, yyyy')}
                </span>
              </div>
              {/* <button className="action-button">Manage</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrevBookings;