import { useEffect, useState, useRef } from "react";
import "./Section2Work.css";
import "@styles/grid-system.css";

export default function Section2Work() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredRight, setIsHoveredRight] = useState(false);
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
          className={`work-left-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 8" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="work-image-container">
            <img
              src={
                isHovered
                  ? "/1_Homepage/1_Homepage/2_Feature works/TraMADE_1.jpg"
                  : "/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg"
              }
              alt="TraMADE Project"
              className="work-image"
            />
          </div>
          <div className="work-info-row">
            <div className="work-info-bottom">
              <div className="work-category">
                <span className="text-7" style={{ color: "#1F1F1F", display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {isHovered && <img src="/icon/Icon/ellipse.svg" alt="" style={{ width: '8px', height: '8px' }} />}
                  TraMADE
                </span>
                <span className="text-8" style={{ color: isHovered ? '#1F1F1F' : '#939393' }}>
                  Tea mastery born in the heights of Măng Đen
                </span>
              </div>
            </div>
            <div className="work-info-right">
              <div className="work-category text-8">
                <span style={{ color: isHovered ? '#1F1F1F' : '#939393' }}>Branding Strategy, Brand Identity</span>
              </div>
            </div>
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
            <div className="work-details-right-text">
              <div className="work-category text-8">
                <span>Branding</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
