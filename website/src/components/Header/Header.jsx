import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ business, loading }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const businessName = business?.basic_info?.name || "Loading...";
  const phone = business?.basic_info?.phone || "";
  const rating = parseFloat(business?.basic_info?.rating) || 0;
  const showReviews = rating >= 4.0;

  // Detect scrolling (for styling the header)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Scroll to a given section by ID.
   * If we’re not on the home page ("/"), navigate to "/"
   * then scroll to the element after a short delay.
   */
  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      // small timeout so the DOM on "/" has time to render
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          {loading ? "Loading..." : businessName}
        </div>

        <nav className="nav-menu">
          {/* Replace <a href="#hero"> with a clickable element */}
          <span
            onClick={() => handleNavClick('hero')}
            className="nav-link"
            role="button"
            tabIndex={0}
          >
            Home
          </span>

          <span
            onClick={() => handleNavClick('about')}
            className="nav-link"
            role="button"
            tabIndex={0}
          >
            About
          </span>

          <span
            onClick={() => handleNavClick('services')}
            className="nav-link"
            role="button"
            tabIndex={0}
          >
            Services
          </span>

          {/* Show reviews nav only if rating >= 4.0 */}
          {showReviews && (
            <span
              onClick={() => handleNavClick('reviews')}
              className="nav-link"
              role="button"
              tabIndex={0}
            >
              Reviews
              <span className="review-badge">{rating}★</span>
            </span>
          )}

          <span
            onClick={() => handleNavClick('contact')}
            className="nav-link"
            role="button"
            tabIndex={0}
          >
            Contact
          </span>
        </nav>

        {phone && (
          <a
            href={`tel:${phone.replace(/[^0-9]/g, '')}`}
            className="phone-button"
          >
            <i className="fas fa-phone"></i>
            <span>{phone}</span>
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
