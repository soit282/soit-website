import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css';
import '@styles/grid-system.css';

// Shuffle text effect class
class SmoothShuffler {
  constructor(element, options = {}) {
    this.element = element;
    this.originalText = element.textContent;
    this.duration = options.duration || 400;
    this.shuffleCount = options.shuffleCount || 1;
    this.isAnimating = false;
  }

  shuffleString(str) {
    const arr = str.split("");
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
  }

  async shuffle() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    for (let i = 0; i < this.shuffleCount; i++) {
      const shuffled = this.shuffleString(this.originalText);
      this.element.textContent = shuffled;
      await this.delay(this.duration / (this.shuffleCount + 1));
    }

    this.element.textContent = this.originalText;
    this.isAnimating = false;
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  reset() {
    this.element.textContent = this.originalText;
  }
}

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isInSection1, setIsInSection1] = useState(true);
  const worksRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const playgroundRef = useRef(null);
  const shufflersRef = useRef({});

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    // Initialize shuffle effects for all menu items
    const menuRefs = [
      { ref: worksRef, key: "Works" },
      { ref: aboutRef, key: "About" },
      { ref: servicesRef, key: "Services" },
      { ref: playgroundRef, key: "Playground" },
    ];

    menuRefs.forEach(({ ref, key }) => {
      if (ref.current) {
        shufflersRef.current[key] = new SmoothShuffler(ref.current, {
          duration: 400,
          shuffleCount: 3,
        });
      }
    });

    // Handle scroll to detect section position
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const section1Height = window.innerHeight;

      // Only hide logo when in HomePage Section1, show on all other pages
      const isHomePage = location.pathname === '/';
      if (isHomePage) {
        setIsInSection1(currentScrollY < section1Height * 0.8);
      } else {
        setIsInSection1(false); // Always show logo on other pages
      }
    };

    // Initial check for non-home pages
    if (location.pathname !== '/') {
      setIsInSection1(false);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const createHoverHandlers = (menuKey) => ({
    onMouseEnter: () => {
      if (shufflersRef.current[menuKey]) {
        shufflersRef.current[menuKey].shuffle();
      }
    },
    onMouseLeave: () => {
      if (shufflersRef.current[menuKey]) {
        setTimeout(() => {
          shufflersRef.current[menuKey].reset();
        }, 100);
      }
    },
  });

  return (
    <nav className="navbar">
      <div className="grid-container navbar-container">
        {/* Logo - positioned at column 1 */}
        <div className={`navbar-logo-wrapper ${isInSection1 ? 'hidden' : ''}`}>
          <a href="/" className="navbar-logo">
            <img src="/icon/Icon/Số Ít logo.svg" alt="Số Ít" className="navbar-logo-img" />
          </a>
        </div>

        {/* Menu - positioned at center columns */}
        <div className="navbar-menu-wrapper">
          <ul className={`navbar-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li className="navbar-item">
              <a href="/works" className="navbar-link">
                <span
                  className="navbar-shuffle-text text-7"
                  ref={worksRef}
                  {...createHoverHandlers("Works")}
                >
                  Works
                </span>
              </a>
            </li>
            <li className="navbar-item">
              <a href="/about" className="navbar-link">
                <span
                  className="navbar-shuffle-text text-7"
                  ref={aboutRef}
                  {...createHoverHandlers("About")}
                >
                  About
                </span>
              </a>
            </li>
            <li className="navbar-item">
              <a href="/services" className="navbar-link">
                <span
                  className="navbar-shuffle-text text-7"
                  ref={servicesRef}
                  {...createHoverHandlers("Services")}
                >
                  Services
                </span>
              </a>
            </li>
            <li className="navbar-item">
              <a href="/playground" className="navbar-link">
                <span
                  className="navbar-shuffle-text text-7"
                  ref={playgroundRef}
                  {...createHoverHandlers("Playground")}
                >
                  Playground
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* Vacation text - positioned at right column */}
        <div className="navbar-vacation-wrapper">
          <span className="navbar-vacation text-7">
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