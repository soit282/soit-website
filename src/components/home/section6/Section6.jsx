import { useState, useEffect, useRef } from "react";
import "./Section6.css";

export default function Section6() {
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
      const isInBounds = mouseClientY.current >= rect.top && mouseClientY.current <= rect.bottom;
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
    <div ref={sectionRef} className="section6" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <video autoPlay loop muted playsInline>
        <source
          src="/1_Homepage/1_Homepage/2_Feature works/Dogma_2.mp4"
          type="video/mp4"
        />
      </video>
      <div
        className="section6-content text-8"
        style={{
          position: "absolute",
          top: `${mouseY}%`,
          transform: "translateY(-50%)",
          left: 0,
          right: 0,
          padding: "0 1.25%",
          zIndex: 2,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div className="text-left text-7">
          <p>Dogma</p>
        </div>
        <div className="text-center">
          <p>A private collection of archival and contemporary art</p>
        </div>
        <div className="text-right">
          <p>Branding</p>
        </div>
      </div>
    </div>
  );
}
