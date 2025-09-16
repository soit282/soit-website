import { useEffect, useState, useRef } from "react";
import "./Section4Work.css";
import "@styles/grid-system.css";

export default function Section4Work() {
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
    <section ref={sectionRef} className="section4-work">
      <div className="grid-container">
        <div
          className={`project-left-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 4" }}
        >
          <div
            className="project-left-hover-area"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="project-image-container">
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg"
                alt="Project Left"
                className="project-image"
                style={{
                  display: isHovered ? 'none' : 'block'
                }}
              />
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_1.jpg"
                alt="Project Left Hover"
                className="project-image"
                style={{
                  display: isHovered ? 'block' : 'none'
                }}
              />
            </div>
            <div className="project-info-row">
              <div className="project-info-bottom">
                <div className="project-category">
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
                    Dogma
                  </span>
                  <span
                    className="text-8"
                    style={{ color: isHovered ? "#1F1F1F" : "#939393" }}
                  >
                    A private collection of archival and contemporary art
                  </span>
                </div>
              </div>
              <div className="project-info-right">
                <div className="project-category text-8">
                  <span style={{ color: isHovered ? "#1F1F1F" : "#939393" }}>
                    Branding
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`project-details-container ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "5 / span 8" }}
        >
          <div
            className="project-details-hover-area"
            onMouseEnter={() => setIsHoveredRight(true)}
            onMouseLeave={() => setIsHoveredRight(false)}
          >
            <img
              src="/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png"
              alt="Right Project"
              className="project-details-image"
              style={{
                display: isHoveredRight ? 'none' : 'block'
              }}
            />
            <img
              src="/1_Homepage/1_Homepage/2_Feature works/Okkio_2.png"
              alt="Right Project Hover"
              className="project-details-image"
              style={{
                display: isHoveredRight ? 'block' : 'none'
              }}
            />
            <div className="project-details-text">
              <div className="project-category">
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
                  Lune
                </span>
                <span
                  className="text-8"
                  style={{ color: isHoveredRight ? "#1F1F1F" : "#939393" }}
                >
                  Modern French culinary experience in Saigon
                </span>
              </div>
              <div className="project-details-right-text">
                <div className="project-category text-8">
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
