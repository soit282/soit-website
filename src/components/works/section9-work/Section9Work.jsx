import { useEffect, useState, useRef } from "react";
import "./Section9Work.css";
import Magnet from "../../common/Magnet";

export default function Section9Work() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBackgroundHovered, setIsBackgroundHovered] = useState(false);
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = sectionRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, []);

  // Check if cursor is over background on scroll or mouse move
  useEffect(() => {
    let lastMouseX = 0;
    let lastMouseY = 0;

    const checkIfCursorOverBackground = () => {
      if (!backgroundRef.current) return;

      const rect = backgroundRef.current.getBoundingClientRect();
      const isOver =
        lastMouseX >= rect.left &&
        lastMouseX <= rect.right &&
        lastMouseY >= rect.top &&
        lastMouseY <= rect.bottom;

      setIsBackgroundHovered(isOver);
    };

    const handleMouseMove = (e) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      checkIfCursorOverBackground();
    };

    const handleScroll = () => {
      checkIfCursorOverBackground();
    };

    // Track mouse position and check on scroll
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="section9-work">
      <div
        ref={backgroundRef}
        className="connect-background"
      >
        <div className="connect-container">
          <Magnet
            padding={1000}
            magnetStrength={3}
            activeTransition="transform 0.2s ease-out"
            inactiveTransition="transform 0.4s ease-out"
            parentHovered={isBackgroundHovered}
          >
            <h2 className={`connect-title text-2_100pt_medium ${isVisible ? "visible" : ""}`}>
              LET'S CONNECT
            </h2>
          </Magnet>
        </div>
      </div>
    </section>
  );
}