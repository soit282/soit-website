import { useEffect, useState, useRef } from "react";
import "./Section9Work.css";
import Magnet from "../../common/Magnet";

export default function Section9Work() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBackgroundHovered, setIsBackgroundHovered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="section9-work">
      <div
        className="connect-background"
        onMouseEnter={() => setIsBackgroundHovered(true)}
        onMouseLeave={() => setIsBackgroundHovered(false)}
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