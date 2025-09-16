import { useEffect, useState, useRef } from "react";
import "./TraMadeWorkDetail.css";

export default function TraMadeWorkDetail() {
  const [isVisible, setIsVisible] = useState(false);
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
    <div ref={sectionRef} className="tramade-work-detail">
      <div className="tramade-container">
        <div className={`tramade-hero ${isVisible ? "visible" : ""}`}>
          <h1 className="tramade-title text-2_100pt_medium">
            TràMADE
          </h1>
          <p className="tramade-subtitle text-4">
            Tea mastery born in the heights of Măng Đen
          </p>
        </div>

        <div className="tramade-content">
          <div className="tramade-info-section">
            <div className="tramade-description">
              <p className="text-4">
                A comprehensive tea brand identity project that celebrates the artistry
                of Vietnamese tea culture from the highlands of Măng Đen.
              </p>
            </div>

            <div className="tramade-details">
              <div className="detail-item">
                <span className="detail-label text-8">Client</span>
                <span className="detail-value text-7">TràMADE</span>
              </div>
              <div className="detail-item">
                <span className="detail-label text-8">Services</span>
                <span className="detail-value text-7">Branding Strategy, Brand Identity</span>
              </div>
              <div className="detail-item">
                <span className="detail-label text-8">Year</span>
                <span className="detail-value text-7">2024</span>
              </div>
            </div>
          </div>

          <div className="tramade-images">
            <div className="tramade-image-container">
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_1.jpg"
                alt="TràMADE Project Image 1"
                className="tramade-image"
              />
            </div>
            <div className="tramade-image-container">
              <img
                src="/1_Homepage/1_Homepage/2_Feature works/TraMADE_18_Packaging.jpg"
                alt="TràMADE Project Image 2"
                className="tramade-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}