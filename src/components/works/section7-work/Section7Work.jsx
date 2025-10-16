import { useEffect, useState, useRef } from "react";
import { preloadImages } from "@utils/imagePreloader";
import "./Section7Work.css";
import "@styles/grid-system.css";

export default function Section7Work() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Defer image preload until after page is interactive
  useEffect(() => {
    preloadImages(["/1_Homepage/1_Homepage/2_Feature works/TBros_2.png"], 1000);
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

  // Debounced video pause on hover (300ms delay to avoid interrupting scroll)
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="section7-work">
      <div className="grid-container">
        <div
          className={`display-main-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 12" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="display-video-container">
            {shouldLoadVideo ? (
              <>
                <video
                  ref={videoRef}
                  src="/1_Homepage/1_Homepage/2_Feature works/TBros_1.mov"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="display-video display-video-default"
                />
                <img
                  src="/1_Homepage/1_Homepage/2_Feature works/TBros_2.png"
                  alt="Display Project"
                  className="display-video display-video-hover"
                />
              </>
            ) : (
              <div className="display-video display-video-placeholder" />
            )}
          </div>
          <div className="display-info-row">
            <div className="display-info-bottom">
              <div className="display-category">
                <span className="text-7 display-title">
                  <img
                    src="/icon/Icon/ellipse.svg"
                    alt=""
                    className="display-ellipse"
                  />
                  TBros
                </span>
                <span className="text-8 display-description">
                  Vietnam's most awarded bean-to-bar chocolate
                </span>
              </div>
            </div>
            <div className="display-info-right">
              <div className="display-category text-8">
                <span className="display-description">Branding</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
