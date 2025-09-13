import React, { useState } from 'react';
import './Navbar.css';
import '@styles/grid-system.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="grid-container navbar-container">
        {/* Logo - positioned at column 1 */}
        <div className="navbar-logo-wrapper">
          <a href="/" className="navbar-logo">
            <img src="/icon/Icon/Số Ít logo.svg" alt="Số Ít" className="navbar-logo-img" />
          </a>
        </div>

        {/* Menu - positioned at center columns */}
        <div className="navbar-menu-wrapper">
          <ul className={`navbar-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li className="navbar-item">
              <a href="/works" className="navbar-link">Works</a>
            </li>
            <li className="navbar-item">
              <a href="/about" className="navbar-link">About</a>
            </li>
            <li className="navbar-item">
              <a href="/services" className="navbar-link">Services</a>
            </li>
            <li className="navbar-item">
              <a href="/playground" className="navbar-link">Playground</a>
            </li>
          </ul>
        </div>

        {/* Vacation text - positioned at right column */}
        <div className="navbar-vacation-wrapper">
          <span className="navbar-vacation">
            We are on vacation
            <img src="/icon/Icon/ellipse.svg" alt="" className="navbar-vacation-icon" />
          </span>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;