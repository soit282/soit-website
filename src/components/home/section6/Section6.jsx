import { useState, useEffect, useRef } from "react";
import "./Section6.css";

export default function Section6() {
  const [mouseY, setMouseY] = useState(50);
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef(null);
  const lastMouseY = useRef(0);

  const updatePosition = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const y = ((lastMouseY.current - rect.top) / rect.height) * 100;
      setMouseY(y);
      // Hide text when mouse is outside section
      setIsVisible(lastMouseY.current >= rect.top && lastMouseY.current <= rect.bottom);
    }
  };

  const handleMouseMove = (e) => {
    lastMouseY.current = e.clientY;
    const rect = e.currentTarget.getBoundingClientRect();
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouseY(y);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      updatePosition();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
