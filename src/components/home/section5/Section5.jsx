import { useState, useEffect, useRef } from "react";
import "./Section5.css";
import "@styles/grid-system.css";

export default function Section5() {
  const [mouseY, setMouseY] = useState(50);
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef(null);
  const mouseClientY = useRef(null);

  const updateMousePosition = () => {
    if (sectionRef.current && mouseClientY.current !== null) {
      const rect = sectionRef.current.getBoundingClientRect();
      const y = ((mouseClientY.current - rect.top) / rect.height) * 100;
      setMouseY(y);
      // Show text only when mouse is within section bounds
      const isInBounds =
        mouseClientY.current >= rect.top && mouseClientY.current <= rect.bottom;
      setIsVisible(isInBounds);
    }
  };

  const handleMouseMove = (e) => {
    mouseClientY.current = e.clientY;
    updateMousePosition();
  };

  const handleMouseLeave = () => {
    // Don't null out mouseClientY to maintain position during scroll
    setIsVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      updateMousePosition();
    };

    // Track global mouse position
    const handleGlobalMouseMove = (e) => {
      mouseClientY.current = e.clientY;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleGlobalMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="section5"
      style={{
        backgroundImage: `url('/1_Homepage/1_Homepage/2_Feature works/TBros_2.png')`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="section5-content"
        style={{
          position: "absolute",
          top: `${mouseY}%`,
          transform: "translateY(-50%)",
          left: 0,
          right: 0,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Using proper grid system */}
        <div className="grid-container">
          {/* Text left */}
          <div className="section5-text-left text-left text-5">
            <p>TBros</p>
          </div>
          {/* Text center */}
          <div className="section5-text-center text-center-item text-8">
            <p>Vietnam's most awarded bean-to-bar chocolate</p>
          </div>
          {/* Text right */}
          <div className="section5-text-right text-right text-8">
            <p>Branding</p>
          </div>
        </div>
      </div>
    </div>
  );
}
