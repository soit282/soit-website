import { useEffect, useState, useRef } from "react";
import "./Section7Work.css";
import "@styles/grid-system.css";

export default function Section7Work() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
    <section ref={sectionRef} className="section7-work">
      <div className="grid-container">
        <div
          className={`display-main-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 12" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="display-video-container">
            {isHovered ? (
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TBros_2.png"
                alt="Display Project"
                className="display-video"
              />
            ) : (
              <video
                src="/1_Homepage/1_Homepage/2_Feature works/TBros_1.mov"
                autoPlay
                muted
                loop
                playsInline
                className="display-video"
              />
            )}
          </div>
          <div className="display-info-row">
            <div className="display-info-bottom">
              <div className="display-category">
                <span
                  className="text-7"
                  style={{
                    color: "#1F1F1F",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {isHovered && (
                    <img
                      src="/icon/Icon/ellipse.svg"
                      alt=""
                      style={{ width: "8px", height: "8px" }}
                    />
                  )}
                  TBros
                </span>
                <span
                  className="text-8"
                  style={{ color: isHovered ? "#1F1F1F" : "#939393" }}
                >
                  Vietnam’s most awarded bean-to-bar chocolate
                </span>
              </div>
            </div>
            <div className="display-info-right">
              <div className="display-category text-8">
                <span style={{ color: isHovered ? "#1F1F1F" : "#939393" }}>
                  Branding
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
