import { useEffect, useState, useRef } from "react";
import { preloadImages } from "@utils/imagePreloader";
import "./Section5Work.css";
import "@styles/grid-system.css";

export default function Section5Work() {
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
    <section ref={sectionRef} className="section5-work">
      <div className="grid-container">
        <div
          className={`showcase-main-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 12" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="showcase-video-container">
            {shouldLoadVideo ? (
              <>
                <video
                  ref={videoRef}
                  src="/1_Homepage/1_Homepage/2_Feature works/TBros_1.mov"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="showcase-video showcase-video-default"
                />
                <img
                  src="/1_Homepage/1_Homepage/2_Feature works/TBros_2.png"
                  alt="Project Showcase"
                  className="showcase-video showcase-video-hover"
                />
              </>
            ) : (
              <div className="showcase-video showcase-video-placeholder" />
            )}
          </div>
          <div className="showcase-info-row">
            <div className="showcase-info-bottom">
              <div className="showcase-category">
                <span className="text-7 showcase-title">
                  <img
                    src="/icon/Icon/ellipse.svg"
                    alt=""
                    className="showcase-ellipse"
                  />
                  CPC
                </span>
                <span className="text-8 showcase-description">
                  Vietnam's most awarded bean-to-bar chocolate
                </span>
              </div>
            </div>
            <div className="showcase-info-right">
              <div className="showcase-category text-8">
                <span className="showcase-description">Branding</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
