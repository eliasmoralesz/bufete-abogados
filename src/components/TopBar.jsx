import React, { useEffect, useRef, useState } from 'react';
import './TopBar.css';

const TopBar = () => {
  const [hideTopBar, setHideTopBar] = useState(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setHideTopBar(window.scrollY > 50);
      }, 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(scrollTimeoutRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`top-bar ${hideTopBar ? 'scrolled' : ''}`}>
      <div className="top-bar-left">
        <a href="mailto:daguerhernandezvasquez@gmail.com" className="contact-link">
          <span className="icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </span>
          <span className="text">daguerhernandezvasquez@gmail.com</span>|
        </a>

        <a href="tel:+50689655582" className="contact-link">
          <span className="icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 21.17 2.83 13.93 2.83 5a1 1 0 011-1H7.3a1 1 0 011 1c0 1.35.26 2.67.76 3.88a1 1 0 01-.26 1.11l-2.18 2.2z"/>
            </svg>
          </span>
          <span className="text">+506 8965-5582</span>|
        </a>

        <a href="https://maps.app.goo.gl/twiMemVxLYbTfmoMA" target="_blank" rel="noopener noreferrer" className="contact-link">
          <span className="icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 
              0-2.5-1.12-2.5-2.5s1.12-2.5 
              2.5-2.5 2.5 1.12 2.5 2.5S13.38 
              11.5 12 11.5z"/>
            </svg>
          </span>
          <span className="text">Barrio Luján, San José, Costa Rica</span>
        </a>
      </div>

      <div className="top-bar-right">
        <a
          href="https://cr.linkedin.com/in/daguerhernandezvasquez?original_referer=https%3A%2F%2Fwww.google.com%2F"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.7v2.3h.1c.7-1.3 2.4-2.7 5-2.7 5.3 0 6.3 3.5 6.3 8V24h-5V16.5c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4v7.6h-5V8z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default TopBar;
