import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LazyVideo from "@components/common/LazyVideo";
import { preloadImages } from "@utils/imagePreloader";
import "@components/common/LazyMedia.css";
import "./Section3Work.css";
import "@styles/grid-system.css";

export default function Section3Work() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const navigate = useNavigate();

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
    <section ref={sectionRef} className="section3-work">
      <div className="grid-container">
        <div
          className={`work-main-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 12" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => navigate('/works/tbros')}
        >
          <div className="work-video-container">
            {shouldLoadVideo ? (
              <>
                <LazyVideo
                  ref={videoRef}
                  src="/1_Homepage/1_Homepage/2_Feature works/TBros_1.mov"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="work-video work-video-default"
                />
                <img
                  src="/1_Homepage/1_Homepage/2_Feature works/TBros_2.png"
                  alt="TBros"
                  className="work-video work-video-hover"
                />
              </>
            ) : (
              <div className="work-video work-video-placeholder" />
            )}
          </div>
          <div className="work-info-row-section3">
            <div className="work-info-bottom">
              <div className="work-category">
                <span className="text-7 work-title">
                  <img
                    src="/icon/Icon/ellipse.svg"
                    alt=""
                    className="work-ellipse"
                  />
                  TBros
                </span>
                <span className="text-8 work-description">
                  Vietnam's most awarded bean-to-bar chocolate
                </span>
              </div>
            </div>
            <div className="work-info-right">
              <div className="work-category text-8">
                <span className="work-description">Branding</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
