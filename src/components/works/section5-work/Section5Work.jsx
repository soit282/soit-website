import { useEffect, useState, useRef } from "react";
import "./Section5Work.css";
import "@styles/grid-system.css";

export default function Section5Work() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);

  // Preload hover image
  useEffect(() => {
    const img = new Image();
    img.src = "/1_Homepage/1_Homepage/2_Feature works/TBros_2.png";
  }, []);

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
    <section ref={sectionRef} className="section5-work">
      <div className="grid-container">
        <div
          className={`showcase-main-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 12" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="showcase-video-container">
            {isHovered ? (
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TBros_2.png"
                alt="Project Showcase"
                className="showcase-video"
              />
            ) : (
              <video
                src="/1_Homepage/1_Homepage/2_Feature works/TBros_1.mov"
                autoPlay
                muted
                loop
                playsInline
                className="showcase-video"
              />
            )}
          </div>
          <div className="showcase-info-row">
            <div className="showcase-info-bottom">
              <div className="showcase-category">
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
                  CPC
                </span>
                <span
                  className="text-8"
                  style={{ color: isHovered ? "#1F1F1F" : "#939393" }}
                >
                  Vietnam’s most awarded bean-to-bar chocolate
                </span>
              </div>
            </div>
            <div className="showcase-info-right">
              <div className="showcase-category text-8">
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
