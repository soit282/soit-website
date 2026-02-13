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
  const logoWrapperRef = useRef(null);
  const logoImgRef = useRef(null);
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

    // ─── Logo scroll animation ───
    const wrapper = logoWrapperRef.current;
    const img = logoImgRef.current;
    if (!wrapper) return;

    const isHomePage = location.pathname === ROUTES.HOME;
    const LOGO_ASPECT_RATIO = 1404 / 442;
    const NAVBAR_LOGO_HEIGHT = 20;
    const NAVBAR_LOGO_WIDTH = NAVBAR_LOGO_HEIGHT * LOGO_ASPECT_RATIO;
    const NAVBAR_WRAPPER_HEIGHT = 70;
    const NAVBAR_LEFT_DESKTOP = 24;
    const NAVBAR_LEFT_MOBILE = 16;

    // Compute all animation values from viewport dimensions
    const computeValues = (vw, vh) => {
      const navbarLeft = vw <= 576 ? NAVBAR_LEFT_MOBILE : NAVBAR_LEFT_DESKTOP;
      const fullDisplayH = (vw * 0.9) / LOGO_ASPECT_RATIO;
      const navbarScale = NAVBAR_LOGO_HEIGHT / fullDisplayH;
      const startY = (vh - fullDisplayH) / 2;
      const targetX = -(vw / 2 - (navbarLeft + NAVBAR_LOGO_WIDTH / 2 + 7));
      const targetY = -(vh / 2 - NAVBAR_WRAPPER_HEIGHT / 2);
      return { navbarLeft, navbarScale, startY, targetX, targetY };
    };

    if (isHomePage) {
      let cachedVW = window.innerWidth;
      let cachedVH = window.innerHeight;
      let vals = computeValues(cachedVW, cachedVH);

      let currentAnimatingMode = null;

      const applyLogoStyle = (animating, scale, posX, posY) => {
        if (animating) {
          if (currentAnimatingMode !== true) {
            currentAnimatingMode = true;
            wrapper.style.left = "50%";
            wrapper.style.top = "50%";
            if (img) { img.style.width = "90vw"; img.style.height = "auto"; }
          }
          wrapper.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) scale(${scale})`;
        } else {
          if (currentAnimatingMode !== false) {
            currentAnimatingMode = false;
            wrapper.style.left = vals.navbarLeft + "px";
            wrapper.style.top = "0px";
            if (img) { img.style.width = ""; img.style.height = ""; }
          }
          wrapper.style.transform = "translate3d(0, 0, 0) scale(1)";
        }
      };

      const updateLogoPosition = () => {
        const scrollY = window.scrollY;
        const phase1End = cachedVH * 0.65;
        const phase2Range = cachedVH * 0.35;

        if (scrollY <= phase1End) {
          const progress = scrollY / phase1End;
          applyLogoStyle(true, 1, 0, vals.startY * (1 - progress));
        } else {
          const p = Math.min((scrollY - phase1End) / phase2Range, 1);
          const done = p >= 1;
          const scale = done ? vals.navbarScale : 1 - p * (1 - vals.navbarScale);
          applyLogoStyle(!done, scale, vals.targetX * p, vals.targetY * p);
        }
      };

      // RAF loop — only runs during active scrolling, auto-stops
      let rafId = null;
      let scrollEndTimer = null;

      const rafLoop = () => {
        updateLogoPosition();
        rafId = requestAnimationFrame(rafLoop);
      };

      const stopRafLoop = () => {
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        updateLogoPosition();
      };

      const handleScroll = () => {
        if (!rafId) rafId = requestAnimationFrame(rafLoop);
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(stopRafLoop, 200);
      };

      // Initial position
      if (window.scrollY === 0) {
        applyLogoStyle(true, 1, 0, vals.startY);
      } else {
        updateLogoPosition();
      }

      // Only recalc on width changes (ignore URL bar height changes)
      const handleResize = () => {
        if (window.innerWidth !== cachedVW) {
          cachedVW = window.innerWidth;
          cachedVH = window.innerHeight;
          vals = computeValues(cachedVW, cachedVH);
          updateLogoPosition();
        }
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollEndTimer);
        if (rafId) cancelAnimationFrame(rafId);
        wrapper.style.transform = "";
        wrapper.style.left = "";
        wrapper.style.top = "";
        if (img) { img.style.width = ""; img.style.height = ""; }
      };
    }

    // ═══════════════════════════════════════════════════════════════
    // Non-home page: static navbar position
    // ═══════════════════════════════════════════════════════════════
    const navLeft = (window.innerWidth <= 576 ? 16 : 24) + "px";
    wrapper.style.left = navLeft;
    wrapper.style.top = "0px";
    wrapper.style.transform = "translate3d(0, 0, 0) scale(1)";
    if (img) { img.style.width = ""; img.style.height = ""; }
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
        {/* Unfinished items hidden for now
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
        */}
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
      ref={logoWrapperRef}
      className="navbar-logo-wrapper"
      style={{
        position: "fixed",
        zIndex: 100011,
        transformOrigin: "center center",
        willChange: "transform",
        transition: "none",
      }}
    >
      <a href={ROUTES.HOME} className="navbar-logo">
        <img
          ref={logoImgRef}
          src="/icon/Icon/Số Ít logo.svg"
          alt="Số Ít"
          className="navbar-logo-img"
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
              {/* Unfinished items hidden for now
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
              */}
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

          {location.pathname !== "/" && (
            <button
              className="mobile-menu-toggle text-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              Menu
            </button>
          )}
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
