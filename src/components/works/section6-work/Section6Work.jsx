import { useEffect, useState, useRef } from "react";
import { preloadImages } from "@utils/imagePreloader";
import "./Section6Work.css";
import "@styles/grid-system.css";

export default function Section6Work() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredRight, setIsHoveredRight] = useState(false);
  const sectionRef = useRef(null);

  // Defer image preloading until after page is interactive
  useEffect(() => {
    preloadImages([
      "/1_Homepage/1_Homepage/2_Feature works/TraMADE_1.jpg",
      "/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg",
      "/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png",
      "/1_Homepage/1_Homepage/2_Feature works/Okkio_2.png"
    ], 2000);
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

    const element = sectionRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
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
            <div className="gallery-image-container" style={{ position: 'relative' }}>
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg"
                alt="Gallery Left"
                className="gallery-image"
                style={{
                  opacity: isHovered ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  willChange: isHovered || isHoveredRight ? 'opacity' : 'auto',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_1.jpg"
                alt="Gallery Left Hover"
                className="gallery-image"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  willChange: isHovered || isHoveredRight ? 'opacity' : 'auto',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
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
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png"
                alt="Gallery Right"
                className="gallery-details-image"
                style={{
                  opacity: isHoveredRight ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  willChange: isHovered || isHoveredRight ? 'opacity' : 'auto',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/Okkio_2.png"
                alt="Gallery Right Hover"
                className="gallery-details-image"
                style={{
                  opacity: isHoveredRight ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  willChange: isHovered || isHoveredRight ? 'opacity' : 'auto',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>
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
