import React, { useEffect } from 'react';
import './Message.css';
import Logo from './Logo.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Message = ({ message, onClose }) => {
  useEffect(() => {
    AOS.init({ duration: 300, easing: 'ease-out-quint' });
  }, []);

  return (
    <div
      className="custom-alert"
      data-aos="fade-down"
      data-aos-duration="300"
    >
      <div className="alert-left">
        <img src={Logo} alt="Logo" className="alert-logo" />
      </div>
      <div className="alert-right">
        <p>{message}</p>
      </div>
      <button className="close-btn" onClick={onClose}>✕</button>
    </div>
  );
};

export default Message;