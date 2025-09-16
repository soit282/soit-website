import { useEffect, useState, useRef } from "react";
import "./Section6Work.css";
import "@styles/grid-system.css";

export default function Section6Work() {
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
    <section ref={sectionRef} className="section6-work">
      <div className="grid-container">
        <div
          className={`gallery-left-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 8" }}
        >
          <div
            className="gallery-left-hover-area"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="gallery-image-container">
              <img
                src={
                  isHovered
                    ? "/1_Homepage/1_Homepage/2_Feature works/TraMADE_1.jpg"
                    : "/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg"
                }
                alt="Gallery Left"
                className="gallery-image"
              />
            </div>
            <div className="gallery-info-row">
              <div className="gallery-info-bottom">
                <div className="gallery-category">
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
                    Lune
                  </span>
                  <span
                    className="text-8"
                    style={{ color: isHovered ? "#1F1F1F" : "#939393" }}
                  >
                    Modern French culinary experience in Saigon
                  </span>
                </div>
              </div>
              <div className="gallery-info-right">
                <div className="gallery-category text-8">
                  <span style={{ color: isHovered ? "#1F1F1F" : "#939393" }}>
                    Branding
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`gallery-details-container ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "9 / span 4" }}
        >
          <div
            className="gallery-details-hover-area"
            onMouseEnter={() => setIsHoveredRight(true)}
            onMouseLeave={() => setIsHoveredRight(false)}
          >
            <img
              src={
                isHoveredRight
                  ? "/1_Homepage/1_Homepage/2_Feature works/Okkio_2.png"
                  : "/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png"
              }
              alt="Gallery Right"
              className="gallery-details-image"
            />
            <div className="gallery-details-text">
              <div className="gallery-category">
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
                  Okkio
                </span>
                <span
                  className="text-8"
                  style={{ color: isHoveredRight ? "#1F1F1F" : "#939393" }}
                >
                  A sensory deep dive into Vietnam’s specialty co
                </span>
              </div>
              <div className="gallery-details-right-text">
                <div className="gallery-category text-8">
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
