import { useEffect, useState, useRef } from "react";
import LazyVideo from "@components/common/LazyVideo";
import "@components/common/LazyMedia.css";
import "./Section3Work.css";
import "@styles/grid-system.css";

export default function Section3Work() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const sectionRef = useRef(null);

  // Defer image preload until after page is interactive
  useEffect(() => {
    const preloadImage = () => {
      const img = new Image();
      img.src = "/1_Homepage/1_Homepage/2_Feature works/TBros_2.png";
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadImage);
    } else {
      setTimeout(preloadImage, 1000);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setShouldLoadVideo(true);
        }
      },
      { threshold: 0.1, rootMargin: '200px' } // Load slightly before entering viewport
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
    <section ref={sectionRef} className="section3-work">
      <div className="grid-container">
        <div
          className={`work-main-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 12" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="work-video-container" style={{ position: 'relative' }}>
            {shouldLoadVideo ? (
              <>
                <LazyVideo
                  src="/1_Homepage/1_Homepage/2_Feature works/TBros_1.mov"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="work-video"
                  style={{
                    opacity: isHovered ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                />
                <img
                  src="/1_Homepage/1_Homepage/2_Feature works/TBros_2.png"
                  alt="TBros"
                  className="work-video"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    willChange: 'opacity'
                  }}
                />
              </>
            ) : (
              <div className="work-video" style={{ backgroundColor: '#f0f0f0', transform: 'translateZ(0)' }} />
            )}
          </div>
          <div className="work-info-row-section3">
            <div className="work-info-bottom">
              <div className="work-category">
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
                  TBros
                </span>
                <span
                  className="text-8"
                  style={{ color: isHovered ? "#1F1F1F" : "#939393" }}
                >
                  Vietnam’s most awarded bean-to-bar chocolate
                </span>
              </div>
            </div>
            <div className="work-info-right">
              <div className="work-category text-8">
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
