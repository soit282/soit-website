import { useEffect, useState, useRef } from "react";
import "./Section8Work.css";
import "@styles/grid-system.css";

export default function Section8Work() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredRight, setIsHoveredRight] = useState(false);
  const sectionRef = useRef(null);

  // Preload hover images
  useEffect(() => {
    const imagesToPreload = [
      "/1_Homepage/1_Homepage/2_Feature works/TraMADE_1.jpg",
      "/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg",
      "/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png",
      "/1_Homepage/1_Homepage/2_Feature works/Okkio_2.png"
    ];

    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
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
    <section ref={sectionRef} className="section8-work">
      <div className="grid-container">
        <div
          className={`feature-left-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 4" }}
        >
          <div
            className="feature-left-hover-area"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="feature-image-container" style={{ position: 'relative' }}>
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg"
                alt="Feature Left"
                className="feature-image"
                style={{
                  opacity: isHovered ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_1.jpg"
                alt="Feature Left Hover"
                className="feature-image"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              />
            </div>
            <div className="feature-info-row">
              <div className="feature-info-bottom">
                <div className="feature-category">
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
                    Feature Project
                  </span>
                  <span
                    className="text-8"
                    style={{ color: isHovered ? "#1F1F1F" : "#939393" }}
                  >
                    Feature project description
                  </span>
                </div>
              </div>
              <div className="feature-info-right">
                <div className="feature-category text-8">
                  <span style={{ color: isHovered ? "#1F1F1F" : "#939393" }}>
                    Branding
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`feature-details-container ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "5 / span 8" }}
        >
          <div
            className="feature-details-hover-area"
            onMouseEnter={() => setIsHoveredRight(true)}
            onMouseLeave={() => setIsHoveredRight(false)}
          >
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png"
                alt="Feature Right"
                className="feature-details-image"
                style={{
                  opacity: isHoveredRight ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/Okkio_2.png"
                alt="Feature Right Hover"
                className="feature-details-image"
                style={{
                  opacity: isHoveredRight ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              />
            </div>
            <div className="feature-details-text">
              <div className="feature-category">
                <span
                  className="text-7"
                  style={{
                    color: "#1F1F1F",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {isHoveredRight && (
                    <img
                      src="/icon/Icon/ellipse.svg"
                      alt=""
                      style={{ width: "8px", height: "8px" }}
                    />
                  )}
                  Right Feature
                </span>
                <span
                  className="text-8"
                  style={{ color: isHoveredRight ? "#1F1F1F" : "#939393" }}
                >
                  Right feature description
                </span>
              </div>
              <div className="feature-details-right-text">
                <div className="feature-category text-8">
                  <span
                    style={{ color: isHoveredRight ? "#1F1F1F" : "#939393" }}
                  >
                    Branding
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
