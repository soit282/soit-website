import { useEffect, useState, useRef } from "react";
import "./Section3Work.css";
import "@styles/grid-system.css";

export default function Section3Work() {
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
    <section ref={sectionRef} className="section3-work">
      <div className="grid-container">
        <div
          className={`work-video-container ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 12" }}
        >
          <video
            src="/1_Homepage/1_Homepage/2_Feature works/TBros_1.mov"
            autoPlay
            muted
            loop
            playsInline
            className="work-video"
          />
        </div>
      </div>
    </section>
  );
}