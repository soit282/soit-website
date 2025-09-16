import { useEffect, useState, useRef } from "react";
import "./Section9Work.css";

export default function Section9Work() {
  const [isVisible, setIsVisible] = useState(false);
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
      <div className="connect-background">
        <div className="connect-container">
          <h2 className={`connect-title text-2_100pt_medium ${isVisible ? "visible" : ""}`}>
            LET'S CONNECT
          </h2>
        </div>
      </div>
    </section>
  );
}