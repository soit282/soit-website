import { useState, useEffect, useRef } from "react";
import "./Section7.css";
import "@styles/grid-system.css";

export default function Section7() {
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
      className="section7"
      style={{
        backgroundImage: `url('/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png')`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="section7-content"
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
          <div className="section7-text-left text-left text-5">
            <p>OKKIO</p>
          </div>
          {/* Text center */}
          <div className="section7-text-center text-center-item text-8">
            <p>A sensory deep dive into Vietnam's specialty co</p>
          </div>
          {/* Text right */}
          <div className="section7-text-right text-right text-8">
            <p>Branding</p>
          </div>
        </div>
      </div>
    </div>
  );
}
