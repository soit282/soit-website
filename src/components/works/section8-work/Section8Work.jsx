import { useEffect, useState, useRef } from "react";
import { preloadImages } from "@utils/imagePreloader";
import "./Section8Work.css";
import "@styles/grid-system.css";

export default function Section8Work() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Defer image preloading until after page is interactive
  useEffect(() => {
    preloadImages([
      "/1_Homepage/1_Homepage/2_Feature works/TraMADE_1.jpg",
      "/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg",
      "/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png",
      "/1_Homepage/1_Homepage/2_Feature works/Okkio_2.png"
    ], 2500);
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
    <section ref={sectionRef} className="section8-work">
      <div className="grid-container">
        <div
          className={`feature-left-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 4" }}
        >
          <div className="feature-left-hover-area">
            <div className="feature-image-container">
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg"
                alt="Feature Left"
                className="feature-image feature-image-default"
              />
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_1.jpg"
                alt="Feature Left Hover"
                className="feature-image feature-image-hover"
              />
            </div>
            <div className="feature-info-row">
              <div className="feature-info-bottom">
                <div className="feature-category">
                  <span className="text-7 feature-title">
                    <img
                      src="/icon/Icon/ellipse.svg"
                      alt=""
                      className="feature-ellipse"
                    />
                    Feature Project
                  </span>
                  <span className="text-8 feature-description">
                    Feature project description
                  </span>
                </div>
              </div>
              <div className="feature-info-right">
                <div className="feature-category text-8">
                  <span className="feature-description">
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
          <div className="feature-details-hover-area">
            <div className="feature-details-image-container">
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png"
                alt="Feature Right"
                className="feature-details-image feature-details-image-default"
              />
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/Okkio_2.png"
                alt="Feature Right Hover"
                className="feature-details-image feature-details-image-hover"
              />
            </div>
            <div className="feature-details-text">
              <div className="feature-category">
                <span className="text-7 feature-details-title">
                  <img
                    src="/icon/Icon/ellipse.svg"
                    alt=""
                    className="feature-details-ellipse"
                  />
                  Right Feature
                </span>
                <span className="text-8 feature-details-description">
                  Right feature description
                </span>
              </div>
              <div className="feature-details-right-text">
                <div className="feature-category text-8">
                  <span className="feature-details-description">
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
