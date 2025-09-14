import { useEffect, useState, useRef } from "react";
import "./Section2Work.css";
import "@styles/grid-system.css";

export default function Section2Work() {
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
    <section ref={sectionRef} className="section2-work">
      <div className="grid-container">
        <div
          className={`work-image-container ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 8" }}
        >
          <img
            src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg"
            alt="TraMADE Project"
            className="work-image"
          />
        </div>

        <div
          className={`work-info-bottom ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 8", gridRow: "2" }}
        >
          <div className="work-category text-8">
            <span>TraMADE</span>
            <span>Branding Strategy Brand Identity</span>
          </div>
        </div>

        <div
          className={`work-info-right ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 8", gridRow: "2" }}
        >
          <div className="work-category text-8">
            <span>Branding Strategy, Brand Identity</span>
          </div>
        </div>

        <div
          className={`work-details-container ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "9 / span 4" }}
        >
          <img
            src="/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png"
            alt="OKKIO"
            className="work-details-image"
          />
          <div className="work-details-text">
            <div className="work-category text-8">
              <span>OKKIO</span>
              <span>A culinary deep dive that will make you speechless</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
