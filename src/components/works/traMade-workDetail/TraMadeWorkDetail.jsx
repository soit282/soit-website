import { useEffect, useState, useRef } from "react";
import TraMadeContent from "./TraMadeContent";
import "./TraMadeWorkDetail.css";
import "@styles/grid-system.css";

export default function TraMadeWorkDetail() {
  const [isVisible, setIsVisible] = useState(true); // Set to true immediately
  const sectionRef = useRef(null);

  useEffect(() => {
    // Optional: Add smooth entry animation with delay
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div ref={sectionRef} className="tramade-work-detail">
      <div className="grid-container">
        {/* Title Section - Row 1 */}
        <div
          className={`tramade-title-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 12" }}
        >
          <h1 className="tramade-title text-2_100pt_medium">TràMADE</h1>
        </div>

        {/* Client Section - Row 2 */}
        <div
          className={`tramade-client-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 2" }}
        >
          <div className="detail-item">
            <span className="detail-label text-5">Client</span>
            <span className="detail-value text-6">TràMADE</span>
          </div>
        </div>

        {/* Services Section - Row 2 */}
        <div
          className={`tramade-details-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "3 / span 3" }}
        >
          <div className="detail-item">
            <span className="detail-label text-5">Scope of works</span>
            <span className="detail-value text-6">
              Brand Identity Extension
              <br />
              Typography System
              <br />
              Packaging
              <br />
              Brand Guideline System
            </span>
          </div>
        </div>

        {/* Description Section - Row 2 */}
        <div
          className={`tramade-description-section ${
            isVisible ? "visible" : ""
          }`}
          style={{ gridColumn: "7 / span 6" }}
        >
          <p className="tramade-description text-4">
            <span className="description-line">
              Tea mastery born in the heights of Măng Đen.
            </span>
            <span className="description-line">
              TràMADE is a masterful tea artisan from the fertile highlands of
              Măng Đen, embodying the rustic breath of this serene land. From the
              TràMADE tea hills, clean tea cultivation experts collaborate with
              the Mơ Nâm ethnic group to bring Măng Đen's tea products to Vietnam
              and the world. Every bit of energy absorbed by the tea leaves — from
              both nature and humanity — infuses into the body of the tea drinker.
            </span>
          </p>
        </div>
      </div>

      {/* TraMADE Content Gallery */}
      <TraMadeContent />
    </div>
  );
}
