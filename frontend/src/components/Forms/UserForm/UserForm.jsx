import { useState } from 'react';
import './Userform.css';

const UserForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
  };

  return (
    <div className="form-wrapper">
      <div className="form-section-header">
        <h2 className="form-section-title">Stay <span>In Touch</span></h2>
      </div>
      
      <p className="form-description">
        To be updated with all the latest news, offers and special announcements.
      </p>

      <form className="custom-news-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="user-name">Full Name</label>
          <input type="text" id="user-name" placeholder="John Doe" required />
        </div>

        <div className="input-group">
          <label htmlFor="user-email">Email Address</label>
          <input 
            type="email" 
            id="user-email" 
            placeholder="yourname@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="message">How can we help?</label>
          <textarea id="message" rows="4" placeholder="Your message here..."></textarea>
        </div>

        <button type="submit" className="form-btn-submit">
          Subscribe Now
        </button>
      </form>
    </div>
  );
};

export default UserForm;