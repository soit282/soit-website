import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { preloadImages } from "@utils/imagePreloader";
import { ROUTES } from "@constants/routes";
import "./Section2Work.css";
import "@styles/grid-system.css";

export default function Section2Work() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

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
    <section ref={sectionRef} className="section2-work">
      <div className="grid-container">
        <div
          className={`work-left-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 8" }}
          onClick={() => navigate(ROUTES.WORKS_TRAMADE)}
        >
          <div className="work-image-container">
            <img
              src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg"
              alt="TraMADE Project"
              className="work-image work-image-default"
            />
            <img
              src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_1.jpg"
              alt="TraMADE Project Hover"
              className="work-image work-image-hover"
            />
          </div>
          <div className="work-info-row">
            <div className="work-info-bottom">
              <div className="work-category">
                <span className="text-7 work-title">
                  <img
                    src="/icon/Icon/ellipse.svg"
                    alt=""
                    className="work-ellipse"
                  />
                  TràMADE
                </span>
                <span className="text-8 work-description">
                  Tea mastery born in the heights of Măng Đen
                </span>
              </div>
            </div>
            <div className="work-info-right">
              <div className="work-category text-8">
                <span className="work-description">
                  Branding Strategy, Brand Identity
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`work-details-container ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "9 / span 4" }}
        >
          <div
            className="work-details-hover-area"
            onClick={() => navigate(ROUTES.WORKS_TRAMADE)}
          >
            <div className="work-details-image-container">
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/Okkio_1.png"
                alt="OKKIO"
                className="work-details-image work-details-image-default"
              />
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/Okkio_2.png"
                alt="OKKIO Hover"
                className="work-details-image work-details-image-hover"
              />
            </div>
            <div className="work-details-text">
              <div className="work-category">
                <span className="text-7 work-details-title">
                  <img
                    src="/icon/Icon/ellipse.svg"
                    alt=""
                    className="work-details-ellipse"
                  />
                  OKKIO
                </span>
                <span className="text-8 work-details-description">
                  A culinary deep dive that will make you speechless
                </span>
              </div>
              <div className="work-details-right-text">
                <div className="work-category text-8">
                  <span className="work-details-description">
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
