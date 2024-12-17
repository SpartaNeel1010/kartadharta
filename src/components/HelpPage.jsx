import React, { useState } from 'react';
import './HelpPage.css';

const HelpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const faqs = [
    {
      question: "How do I book a maid service?",
      answer: "You can book a maid service through our platform by selecting your preferred date, time, and service type. We'll match you with verified domestic help in Delhi."
    },
    {
      question: "What areas in Delhi do you cover?",
      answer: "We provide services across all major areas in Delhi NCR, including South Delhi, North Delhi, East Delhi, West Delhi, Noida, and Gurgaon."
    },
    {
      question: "What types of maid services do you offer?",
      answer: "We offer various services including daily cleaning, cooking, baby sitting, elderly care, and full-time domestic help. All our staff are verified and trained."
    },
    {
      question: "How are your maids verified?",
      answer: "All our domestic helpers undergo thorough background verification, including police verification, ID proof checks, and previous employment verification."
    },
    {
      question: "What are your service charges?",
      answer: "Our charges vary based on the type of service, duration, and frequency. You can view detailed pricing on our booking page or contact our support team."
    }
  ];

  return (
    <div className="help-page2">
      <div className="help-header2">
        <h1>Help & Support</h1>
        <p>Get assistance with your maid service booking in Delhi</p>
      </div>

      <div className="help-content2">
        <section className="faq-section2">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid2">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section2">
          <h2>Contact Us</h2>
          <div className="contact-grid2">
            <div className="contact-info2">
              <div className="info-card2">
                <div className="info-icon2">📞</div>
                <h3>Phone Support</h3>
                <p>+91 11-XXXX-XXXX</p>
                <p>Mon-Sat: 9AM to 8PM</p>
              </div>
              <div className="info-card2">
                <div className="info-icon2">✉️</div>
                <h3>Email Support</h3>
                <p>support@maidservice.com</p>
                <p>24/7 Response</p>
              </div>
              <div className="info-card2">
                <div className="info-icon2">📍</div>
                <h3>Office Address</h3>
                <p>123 Service Lane, Connaught Place</p>
                <p>New Delhi - 110001</p>
              </div>
            </div>

            <form className="contact-form2" onSubmit={handleSubmit}>
              <h3>Send us a Message</h3>
              <div className="form-group2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group2">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group2">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group2">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="complaint">Complaint</option>
                </select>
              </div>
              <div className="form-group2">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;