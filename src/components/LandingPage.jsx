import React, { useState } from 'react';
import maid_image from "../assets/maid-image.svg"
import './LandingPage.css';
import {
    UserCheck,
    Receipt,
    Briefcase,
    Shield,
    User
} from 'lucide-react';

const LandingPage = () => {
    const [selectedCity, setSelectedCity] = useState('');

    return (
        <div className="landing-page">

            <div className="hero-section">
                <div className="hero-content">
                    <div className="hero-left">
                        <div className="hero-image-placeholder">
                            <img
                                src={maid_image}
                                alt="Hero Icon"
                                className="hero-icon"
                            />
                        </div>
                    </div>

                    <div className="hero-right">
                        <h2 className="company-name">Karta Dharta</h2>
                        <h1 className="main-heading">Quality home services, on demand</h1>
                        <p className="sub-heading">
                            Experienced, hand-picked Professionals to serve you at your doorstep
                        </p>
                        <div className="location-selector">
                            <h3>Where do you need a service?</h3>
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="city-select"
                            >
                                <option value="" disabled>Select your city</option>
                                <option value="delhi">Delhi</option>
                                <option value="mumbai">Mumbai</option>
                                <option value="bangalore">Bangalore</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <h2>Why Karta Dharta?</h2>
                <div className="features-container">
                    <div className="feature">
                        <Receipt size={48} color="#000" className="feature-icon" />
                        <div className="feature-content">
                            <h3>Transparent pricing</h3>
                            <p>See fixed prices before you book. No hidden charges.</p>
                        </div>
                    </div>
                    <div className="feature">
                        <UserCheck size={48} color="#000" className="feature-icon" />
                        <div className="feature-content">
                            <h3>Experts only</h3>
                            <p>Our professionals are well trained and have on-job expertise.</p>
                        </div>
                    </div>
                    <div className="feature">
                        <Briefcase size={48} color="#000" className="feature-icon" />
                        <div className="feature-content">
                            <h3>Fully equipped</h3>
                            <p>We bring everything needed to get the job done well.</p>
                        </div>
                    </div>
                </div>

                <div className="quality-assurance">
                    <Shield size={48} color="#4169E1" className="quality-icon" />
                    <h2>100% Quality Assured</h2>
                    <p>If you don't love our service, we will make it right.</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;