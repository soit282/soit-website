import { useState, useEffect, useRef } from "react";
import "./Section4.css";
import "@styles/grid-system.css";

export default function Section4() {
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
      className="section4"
      style={{
        backgroundImage: `url('/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg')`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="section4-content text-8"
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
        {/* Grid reference layer for positioning */}
        <div
          className="grid-container grid-reference"
          style={{ position: "relative", height: "100%" }}
        >
          {/* Text positioned based on grid columns but not constrained by them */}
          <div className="text-left text-5 text-position-left">
            <p>TràMADE</p>
          </div>
          <div className="text-center text-position-center">
            <p>Tea mastery born in the heights of Măng Đen</p>
          </div>
          <div className="text-right text-position-right">
            <p>Branding</p>
          </div>
        </div>
      </div>
    </div>
  );
}
