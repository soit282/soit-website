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
    text: "We are on vacation",
    icon: "/icon/Icon/ellipse.svg",
  },
  cooking: {
    text: "We are cooking",
    icon: "/icon/Icon/ellipse.svg", // TODO: Replace with cooking icon
  },
};

// Set the current active mode here
const CURRENT_MODE = "cooking"; // Change to 'vacation' when needed

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoScale, setLogoScale] = useState(1);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);
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

    // Logo constants - matching CSS .navbar-logo-img
    const LOGO_ASPECT_RATIO = 1404 / 442; // SVG viewBox ratio
    const LOGO_BASE_HEIGHT = 20; // CSS: .navbar-logo-img { height: 20px }
    const LOGO_BASE_WIDTH = LOGO_BASE_HEIGHT * LOGO_ASPECT_RATIO; // ≈ 63.5px
    const NAVBAR_WRAPPER_HEIGHT = 70; // CSS: .navbar-logo-wrapper { height: 70px }
    const NAVBAR_LEFT_DESKTOP = 24;
    const NAVBAR_LEFT_MOBILE = 16;

    // Calculate max scale to fill 90% viewport width
    const calculateMaxScale = () => {
      const targetWidth = window.innerWidth * 0.9;
      const maxScale = targetWidth / LOGO_BASE_WIDTH;
      // Cap the scale to prevent extreme pixelation
      return Math.min(maxScale, 25);
    };

    // Get navbar left position based on screen width
    const getNavbarLeft = () => {
      return window.innerWidth <= 576
        ? NAVBAR_LEFT_MOBILE
        : NAVBAR_LEFT_DESKTOP;
    };

    // Handle scroll to scale and move logo
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const section1Height = window.innerHeight;
      const isHomePage = location.pathname === ROUTES.HOME;
      const maxScale = calculateMaxScale();

      if (isHomePage) {
        // Phase 1: Bottom to Center (scroll 0 → 100vh)
        // Phase 2: Center to Navbar with shrink (scroll 100vh → 160vh)
        const phase1End = section1Height;
        const phase2Range = section1Height * 0.6;

        if (currentScrollY <= phase1End) {
          // Phase 1: Move from bottom to center
          const rawProgress = currentScrollY / phase1End;
          const scrollProgress = 1 - Math.pow(1 - rawProgress, 3);

          // Keep animating
          setIsLogoAnimating(true);
          setLogoScale(maxScale);

          // Calculate Y position: logo bottom touches viewport bottom → center
          const scaledLogoHeight = LOGO_BASE_HEIGHT * maxScale;
          const startY = (window.innerHeight - scaledLogoHeight) / 2;
          const currentY = startY * (1 - scrollProgress);

          setLogoPosition({
            x: 0,
            y: currentY,
          });
        } else {
          // Phase 2: Shrink and move to navbar position
          const phase2Progress = Math.min(
            (currentScrollY - phase1End) / phase2Range,
            1
          );
          const scrollProgress = 1 - Math.pow(1 - phase2Progress, 3);

          // Animation complete when scrollProgress reaches 1
          const animationComplete = scrollProgress >= 1;
          setIsLogoAnimating(!animationComplete);

          // Scale from maxScale → 1 (exact navbar logo size)
          const newScale = animationComplete
            ? 1
            : maxScale - scrollProgress * (maxScale - 1);
          setLogoScale(Math.max(1, newScale));

          // Calculate navbar logo center position
          // Add small offset to account for transform origin vs actual position
          const navbarLeft = getNavbarLeft();
          const POSITION_OFFSET_X = 7; // Fine-tune horizontal alignment
          const logoCenterX =
            navbarLeft + LOGO_BASE_WIDTH / 2 + POSITION_OFFSET_X;
          const logoCenterY = NAVBAR_WRAPPER_HEIGHT / 2;

          // Target offset from viewport center to navbar position
          const targetX = -(window.innerWidth / 2 - logoCenterX);
          const targetY = -(window.innerHeight / 2 - logoCenterY);

          setLogoPosition({
            x: targetX * scrollProgress,
            y: targetY * scrollProgress,
          });
        }
      } else {
        setIsLogoAnimating(false);
        setLogoScale(1);
        setLogoPosition({ x: 0, y: 0 });
      }
    };

    // Initial setup based on page
    if (location.pathname === ROUTES.HOME) {
      // Check if at top of page
      if (window.scrollY === 0) {
        const maxScale = calculateMaxScale();
        setIsLogoAnimating(true);
        setLogoScale(maxScale);
        // Start logo at bottom of viewport (logo bottom touches viewport bottom)
        const scaledLogoHeight = LOGO_BASE_HEIGHT * maxScale;
        const startY = (window.innerHeight - scaledLogoHeight) / 2;
        setLogoPosition({ x: 0, y: startY });
      } else {
        handleScroll();
      }
    } else {
      setIsLogoAnimating(false);
      setLogoScale(1);
      setLogoPosition({ x: 0, y: 0 });
    }

    // Handle window resize
    const handleResize = () => {
      if (location.pathname === ROUTES.HOME) {
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
          <a
            href={ROUTES.HOME}
            className="navbar-link"
            onClick={toggleMobileMenu}
          >
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
          <a
            href={ROUTES.WORKS}
            className="navbar-link"
            onClick={toggleMobileMenu}
          >
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
          <a
            href={ROUTES.ABOUT}
            className="navbar-link"
            onClick={toggleMobileMenu}
          >
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
          <a
            href={ROUTES.CONTACT}
            className="navbar-link"
            onClick={toggleMobileMenu}
          >
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
        transform: isLogoAnimating
          ? `translate(-50%, -50%) translate(${logoPosition.x}px, ${logoPosition.y}px) scale(${logoScale})`
          : `scale(1)`,
        left: isLogoAnimating
          ? "50%"
          : window.innerWidth <= 576
          ? "16px"
          : "24px",
        top: isLogoAnimating ? "50%" : "0px",
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
