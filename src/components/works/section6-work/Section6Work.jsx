import { useEffect, useState, useRef } from "react";
import { preloadImages } from "@utils/imagePreloader";
import "./Section6Work.css";
import "@styles/grid-system.css";

export default function Section6Work() {
  const [isVisible, setIsVisible] = useState(false);
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
          <div className="gallery-left-hover-area">
            <div className="gallery-image-container">
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg"
                alt="Gallery Left"
                className="gallery-image gallery-image-default"
              />
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_1.jpg"
                alt="Gallery Left Hover"
                className="gallery-image gallery-image-hover"
              />
            </div>
            <div className="gallery-info-row">
              <div className="gallery-info-bottom">
                <div className="gallery-category">
                  <span className="text-7 gallery-title">
                    <img
                      src="/icon/Icon/ellipse.svg"
                      alt=""
                      className="gallery-ellipse"
                    />
                    Lune
                  </span>
                  <span className="text-8 gallery-description">
                    Modern French culinary experience in Saigon
                  </span>
                </div>
              </div>
              <div className="gallery-info-right">
                <div className="gallery-category text-8">
                  <span className="gallery-description">
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
          <div className="gallery-details-hover-area">
            <div className="gallery-details-image-container">
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png"
                alt="Gallery Right"
                className="gallery-details-image gallery-details-image-default"
              />
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/Okkio_2.png"
                alt="Gallery Right Hover"
                className="gallery-details-image gallery-details-image-hover"
              />
            </div>
            <div className="gallery-details-text">
              <div className="gallery-category">
                <span className="text-7 gallery-details-title">
                  <img
                    src="/icon/Icon/ellipse.svg"
                    alt=""
                    className="gallery-details-ellipse"
                  />
                  Okkio
                </span>
                <span className="text-8 gallery-details-description">
                  A sensory deep dive into Vietnam's specialty co
                </span>
              </div>
              <div className="gallery-details-right-text">
                <div className="gallery-category text-8">
                  <span className="gallery-details-description">
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
