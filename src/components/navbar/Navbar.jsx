import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { ROUTES } from "@constants/routes";
import ParticleExplosion from "../effects/ParticleExplosion";
import "./Navbar.css";
import "@styles/grid-system.css";

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

// Mode configurations for navbar status display
const NAVBAR_MODE_CONFIG = {
  vacation: {
    text: 'We are on vacation',
    icon: '/icon/Icon/ellipse.svg',
  },
  cooking: {
    text: 'We are cooking',
    icon: '/icon/Icon/ellipse.svg', // TODO: Replace with cooking icon
  },
};

// Set the current active mode here
const CURRENT_MODE = 'cooking'; // Change to 'vacation' when needed

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoScale, setLogoScale] = useState(1);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [explosionTrigger, setExplosionTrigger] = useState(0);
  const [explosionPosition, setExplosionPosition] = useState({ x: 0, y: 0 });
  const [currentMode] = useState(CURRENT_MODE);
  const modeConfig = NAVBAR_MODE_CONFIG[currentMode];
  const homeRef = useRef(null);
  const worksRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const playgroundRef = useRef(null);
  const mobileHomeRef = useRef(null);
  const mobileWorksRef = useRef(null);
  const mobileAboutRef = useRef(null);
  const mobileServicesRef = useRef(null);
  const mobilePlaygroundRef = useRef(null);
  const shufflersRef = useRef({});

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    // Use requestAnimationFrame for smoother scroll updates
    let ticking = false;

    const updateLogoOnScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initialize shuffle effects for all menu items
    const menuRefs = [
      { ref: homeRef, key: "Home" },
      { ref: worksRef, key: "Works" },
      { ref: aboutRef, key: "About" },
      { ref: servicesRef, key: "Services" },
      { ref: playgroundRef, key: "Playground" },
      { ref: mobileHomeRef, key: "MobileHome" },
      { ref: mobileWorksRef, key: "MobileWorks" },
      { ref: mobileAboutRef, key: "MobileAbout" },
      { ref: mobileServicesRef, key: "MobileServices" },
      { ref: mobilePlaygroundRef, key: "MobilePlayground" },
    ];

    menuRefs.forEach(({ ref, key }) => {
      if (ref.current) {
        shufflersRef.current[key] = new SmoothShuffler(ref.current, {
          duration: 400,
          shuffleCount: 3,
        });
      }
    });

    // Calculate initial scale based on viewport width
    const calculateMaxScale = () => {
      // Logo SVG viewBox width is 1404px, height 442px
      // At normal size (height: 20px), width is approximately 63px
      // We want it to fill about 90% of viewport width
      const targetWidth = window.innerWidth * 0.9;
      const logoBaseWidth = 63;
      const maxScale = targetWidth / logoBaseWidth;
      // Cap the scale to prevent extreme pixelation
      return Math.min(maxScale, 25);
    };

    // Handle scroll to scale and move logo
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const section1Height = window.innerHeight;
      const isHomePage = location.pathname === ROUTES.HOME;
      const maxScale = calculateMaxScale();

      if (isHomePage) {
        // Use smoother easing function for scroll progress
        const scrollRange = section1Height * 0.6; // Slightly longer scroll range
        const rawProgress = Math.min(currentScrollY / scrollRange, 1);

        // Apply easing function (ease-out cubic) for smoother animation
        const scrollProgress = 1 - Math.pow(1 - rawProgress, 3);

        // Calculate scale with smoother interpolation
        const newScale = maxScale - scrollProgress * (maxScale - 1);
        setLogoScale(Math.max(1, newScale));

        // Calculate position with same easing
        const targetX = -(window.innerWidth / 2 - 40);
        const targetY = -(window.innerHeight / 2 - 35);

        setLogoPosition({
          x: targetX * scrollProgress,
          y: targetY * scrollProgress,
        });
      } else {
        setLogoScale(1);
        setLogoPosition({ x: 0, y: 0 });
      }
    };

    // Initial setup based on page
    if (location.pathname === ROUTES.HOME) {
      // Check if at top of page
      if (window.scrollY === 0) {
        setLogoScale(calculateMaxScale()); // Start with calculated scale
      } else {
        handleScroll(); // Calculate based on current scroll
      }
    } else {
      setLogoScale(1); // Normal size on other pages
    }

    // Handle window resize
    const handleResize = () => {
      if (location.pathname === ROUTES.HOME && window.scrollY < 100) {
        handleScroll();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateLogoOnScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateLogoOnScroll);
      window.removeEventListener("resize", handleResize);
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

  const mobileMenu = (
    <div
      className={`navbar-menu-wrapper ${mobileMenuOpen ? "mobile-open" : ""}`}
    >
      <div className="mobile-menu-header">
        <button
          className="mobile-menu-close text-2"
          onClick={toggleMobileMenu}
          aria-label="Close mobile menu"
        >
          Close
        </button>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <a href={ROUTES.HOME} className="navbar-link" onClick={toggleMobileMenu}>
            <span
              className="navbar-shuffle-text text-2 mobile-text-2"
              ref={mobileHomeRef}
              {...createHoverHandlers("MobileHome")}
            >
              Home
            </span>
          </a>
        </li>
        <li className="navbar-item">
          <a href={ROUTES.WORKS} className="navbar-link" onClick={toggleMobileMenu}>
            <span
              className="navbar-shuffle-text text-2 mobile-text-2"
              ref={mobileWorksRef}
              {...createHoverHandlers("MobileWorks")}
            >
              Works
            </span>
          </a>
        </li>
        <li className="navbar-item">
          <a href={ROUTES.ABOUT} className="navbar-link" onClick={toggleMobileMenu}>
            <span
              className="navbar-shuffle-text text-2 mobile-text-2"
              ref={mobileAboutRef}
              {...createHoverHandlers("MobileAbout")}
            >
              About
            </span>
          </a>
        </li>
        <li className="navbar-item">
          <a
            href={ROUTES.SERVICES}
            className="navbar-link"
            onClick={toggleMobileMenu}
          >
            <span
              className="navbar-shuffle-text text-2 mobile-text-2"
              ref={mobileServicesRef}
              {...createHoverHandlers("MobileServices")}
            >
              Services
            </span>
          </a>
        </li>
        <li className="navbar-item">
          <a
            href={ROUTES.PLAYGROUND}
            className="navbar-link"
            onClick={toggleMobileMenu}
          >
            <span
              className="navbar-shuffle-text text-2 mobile-text-2"
              ref={mobilePlaygroundRef}
              {...createHoverHandlers("MobilePlayground")}
            >
              Playground
            </span>
          </a>
        </li>
        <li className="navbar-item">
          <a href={ROUTES.CONTACT} className="navbar-link" onClick={toggleMobileMenu}>
            <span className="navbar-shuffle-text text-2 mobile-text-2">
              Let's connect
            </span>
          </a>
        </li>
      </ul>
    </div>
  );

  const logoElement = (
    <div
      className="navbar-logo-wrapper"
      style={{
        position: "fixed",
        transform:
          logoScale > 1.5
            ? `translate(-50%, -50%) translate(${logoPosition.x}px, ${logoPosition.y}px) scale(${logoScale})`
            : `scale(1)`,
        left:
          logoScale > 1.5 ? "50%" : window.innerWidth <= 576 ? "16px" : "24px",
        top: logoScale > 1.5 ? "50%" : "0px",
        zIndex: 100011,
        transformOrigin: "center center",
        willChange: "transform",
        transition: "none",
      }}
    >
      <a href={ROUTES.HOME} className="navbar-logo">
        <img
          src="/icon/Icon/Số Ít logo.svg"
          alt="Số Ít"
          className="navbar-logo-img"
          style={{
            vectorEffect: "non-scaling-stroke",
            shapeRendering: "geometricPrecision",
          }}
        />
      </a>
    </div>
  );

  return (
    <>
      {/* Render logo via Portal */}
      {createPortal(logoElement, document.body)}

      <nav className="navbar">
        <div className="grid-container navbar-container">
          {/* Desktop Menu - positioned at center columns */}
          <div className="navbar-menu-wrapper-desktop">
            <ul className="navbar-menu">
              <li className="navbar-item">
                <a href={ROUTES.HOME} className="navbar-link">
                  <span
                    className="navbar-shuffle-text text-6"
                    ref={homeRef}
                    {...createHoverHandlers("Home")}
                  >
                    Home
                  </span>
                </a>
              </li>
              <li className="navbar-item">
                <a href={ROUTES.WORKS} className="navbar-link">
                  <span
                    className="navbar-shuffle-text text-6"
                    ref={worksRef}
                    {...createHoverHandlers("Works")}
                  >
                    Works
                  </span>
                </a>
              </li>
              <li className="navbar-item">
                <a href={ROUTES.ABOUT} className="navbar-link">
                  <span
                    className="navbar-shuffle-text text-6"
                    ref={aboutRef}
                    {...createHoverHandlers("About")}
                  >
                    About
                  </span>
                </a>
              </li>
              <li className="navbar-item">
                <a href={ROUTES.SERVICES} className="navbar-link">
                  <span
                    className="navbar-shuffle-text text-6"
                    ref={servicesRef}
                    {...createHoverHandlers("Services")}
                  >
                    Services
                  </span>
                </a>
              </li>
              <li className="navbar-item">
                <a href={ROUTES.PLAYGROUND} className="navbar-link">
                  <span
                    className="navbar-shuffle-text text-6"
                    ref={playgroundRef}
                    {...createHoverHandlers("Playground")}
                  >
                    Playground
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Status text - positioned at right column */}
          <div className="navbar-vacation-wrapper">
            <span
              className="navbar-vacation text-6"
              onClick={() => {
                setExplosionPosition({
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                });
                setExplosionTrigger((prev) => prev + 1);
              }}
              style={{ cursor: "pointer" }}
            >
              {modeConfig.text}
              <img
                src={modeConfig.icon}
                alt=""
                className="navbar-vacation-icon"
              />
            </span>
          </div>

          <button
            className="mobile-menu-toggle text-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            Menu
          </button>
        </div>
        </nav>
      {/* Render mobile menu via Portal to avoid mix-blend-mode inheritance */}
      {createPortal(mobileMenu, document.body)}
      {/* Render ParticleExplosion via Portal to avoid mix-blend-mode inheritance */}
      {createPortal(
        <ParticleExplosion
          trigger={explosionTrigger}
          position={explosionPosition}
          mode={currentMode}
        />,
        document.body
      )}
    </>
  );
};

export default Navbar;
