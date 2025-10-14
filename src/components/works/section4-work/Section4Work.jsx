import { useEffect, useState, useRef } from "react";
import { preloadImages } from "@utils/imagePreloader";
import "./Section4Work.css";
import "@styles/grid-system.css";

export default function Section4Work() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Defer image preloading until after page is interactive
  useEffect(() => {
    preloadImages([
      "/1_Homepage/1_Homepage/2_Feature works/TraMADE_1.jpg",
      "/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg",
      "/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png",
      "/1_Homepage/1_Homepage/2_Feature works/Okkio_2.png"
    ], 1500);
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
    <section ref={sectionRef} className="section4-work">
      <div className="grid-container">
        <div
          className={`project-left-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 4" }}
        >
          <div className="project-left-hover-area">
            <div className="project-image-container">
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg"
                alt="Project Left"
                className="project-image project-image-default"
              />
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_1.jpg"
                alt="Project Left Hover"
                className="project-image project-image-hover"
              />
            </div>
            <div className="project-info-row">
              <div className="project-info-bottom">
                <div className="project-category">
                  <span className="text-7 project-title">
                    <img
                      src="/icon/Icon/ellipse.svg"
                      alt=""
                      className="project-ellipse"
                    />
                    Dogma
                  </span>
                  <span className="text-8 project-description">
                    A private collection of archival and contemporary art
                  </span>
                </div>
              </div>
              <div className="project-info-right">
                <div className="project-category text-8">
                  <span className="project-description">
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
          <div className="project-details-hover-area">
            <div className="project-details-image-container">
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png"
                alt="Right Project"
                className="project-details-image project-details-image-default"
              />
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/Okkio_2.png"
                alt="Right Project Hover"
                className="project-details-image project-details-image-hover"
              />
            </div>
            <div className="project-details-text">
              <div className="project-category">
                <span className="text-7 project-details-title">
                  <img
                    src="/icon/Icon/ellipse.svg"
                    alt=""
                    className="project-details-ellipse"
                  />
                  Lune
                </span>
                <span className="text-8 project-details-description">
                  Modern French culinary experience in Saigon
                </span>
              </div>
              <div className="project-details-right-text">
                <div className="project-category text-8">
                  <span className="project-details-description">
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
