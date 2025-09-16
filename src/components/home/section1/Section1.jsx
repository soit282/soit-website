import { useEffect, useState, useRef } from "react";
import "./Section1.css";

const Section1 = () => {
  const [logoState, setLogoState] = useState("normal"); // 'normal', 'shrinking', 'shrunken', 'expanding'
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const lastScrollY = useRef(0);
  const animationTimeout = useRef(null);
  const isAtTop = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const section1Height = window.innerHeight;

      // Detect if we're at/near top
      if (currentScrollY < 50) {
        isAtTop.current = true;
      }

      // Scrolling down from top - trigger shrink animation
      // Trigger when: was at top, now scrolled down, and logo is normal
      if (currentScrollY > 50 && isAtTop.current && logoState === "normal") {
        isAtTop.current = false;
        setLogoState("shrinking");

        // Disable scroll events temporarily to prevent conflicts
        window.removeEventListener("scroll", handleScroll);

        // Auto scroll to section 2 after logo animation starts
        setTimeout(() => {
          const section2 = document.querySelector(".hero-tagline-section");
          if (section2) {
            section2.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

            // Re-enable scroll events after scroll completes (much longer wait for very slow scroll)
            setTimeout(() => {
              window.addEventListener("scroll", handleScroll);
            }, 3500); // Increased to 3500ms
          }
        }, 1200); // Increased to 1200ms - wait much longer before starting scroll

        // Mark as shrunken after animation
        animationTimeout.current = setTimeout(() => {
          setLogoState("shrunken");
        }, 1500);
      }

      // Scrolling back up - trigger expand animation
      if (
        currentScrollY < section1Height * 0.8 &&
        lastScrollY.current >= section1Height &&
        (logoState === "shrunken" || logoState === "shrinking")
      ) {
        clearTimeout(animationTimeout.current);
        setLogoState("expanding");

        // Disable scroll events temporarily
        window.removeEventListener("scroll", handleScroll);

        // Scroll to top
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });

          // Re-enable scroll events after scroll completes
          setTimeout(() => {
            window.addEventListener("scroll", handleScroll);
          }, 1000);
        }, 100);

        // Mark as normal after animation
        animationTimeout.current = setTimeout(() => {
          setLogoState("normal");
        }, 1500);
      }

      // Direct reset if scrolled back to top area
      if (currentScrollY < 10 && logoState !== "normal") {
        clearTimeout(animationTimeout.current);
        setLogoState("normal");
        isAtTop.current = true;
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(animationTimeout.current);
    };
  }, [logoState]);

  // Calculate transform for logo animation based on state
  const getLogoStyle = () => {
    const targetScale = 0.034; // Very small scale

    // Account for navbar grid-container padding (1.25% on each side) plus internal spacing
    const containerPadding = window.innerWidth * 0.0125;
    // Logo should be positioned with proper padding + some internal margin like navbar
    const targetX = containerPadding + 39 - window.innerWidth / 2;

    // Make logo shrink to a lower position
    const targetY = window.innerHeight * 1.2 - window.innerHeight * 0.95; // Lower position

    switch (logoState) {
      case "shrinking":
        return {
          transform: `translate(${targetX}px, ${targetY}px) scale(${targetScale})`,
          transition: "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: 1,
        };

      case "shrunken":
        return {
          transform: `translate(${targetX}px, ${targetY}px) scale(${targetScale})`,
          transition: "none",
          opacity: 0,
        };

      case "expanding":
        return {
          transform: "translate(0, 0) scale(1)",
          transition: "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: 1,
        };

      case "normal":
      default:
        return {
          transform: "translate(0, 0) scale(1)",
          transition: "none",
          opacity: 1,
        };
    }
  };

  return (
    <section className="section1" ref={sectionRef}>
      {/* Logo positioned at bottom */}
      <div className="section1-logo-container">
        <img
          ref={logoRef}
          src="/icon/Icon/Số Ít logo.svg"
          alt="Số Ít"
          className="section1-logo"
          style={getLogoStyle()}
        />
      </div>
    </section>
  );
};

export default Section1;
