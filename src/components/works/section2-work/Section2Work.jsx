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
          className={`work-image-container col-8 ${isVisible ? "visible" : ""}`}
        >
          <img
            src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg"
            alt="TraMADE Project"
            className="work-image"
          />
        </div>

        <div className={`work-info-bottom col-8 ${isVisible ? "visible" : ""}`}>
          <div className="work-category text-8">
            <span>TraMADE</span>
            <span>Branding Strategy Brand Identity</span>
          </div>
        </div>

        <div
          className={`work-details-container col-4 ${
            isVisible ? "visible" : ""
          }`}
        >
          <img
            src="/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png"
            alt="OKKIO"
            className="work-details-image"
          />
        </div>
      </div>
    </section>
  );
}
