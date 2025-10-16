import { useEffect, useState, useRef } from "react";
import DogmaContent from "./DogmaContent";
import "./DogmaWorkDetail.css";
import "@styles/grid-system.css";

export default function DogmaWorkDetail() {
  const [isVisible, setIsVisible] = useState(true); // Set to true immediately
  const sectionRef = useRef(null);

  useEffect(() => {
    // Optional: Add smooth entry animation with delay
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div ref={sectionRef} className="dogma-work-detail">
      <div className="grid-container">
        {/* Title Section - Row 1 */}
        <div
          className={`dogma-title-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 12" }}
        >
          <h1 className="dogma-title text-2_100pt_medium">DOGMA</h1>
        </div>

        {/* Client Section - Row 2 */}
        <div
          className={`dogma-client-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 2" }}
        >
          <div className="detail-item">
            <span className="detail-label text-5">Client</span>
            <span className="detail-value text-6">DOGMA</span>
          </div>
        </div>

        {/* Services Section - Row 2 */}
        <div
          className={`dogma-details-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "3 / span 3" }}
        >
          <div className="detail-item">
            <span className="detail-label text-5">Scope of works</span>
            <span className="detail-value text-6">
              Brand Identity
              <br />
              Typography System
              <br />
              Spatial Design
              <br />
              Brand Guideline System
            </span>
          </div>
        </div>

        {/* Description Section - Row 2 */}
        <div
          className={`dogma-description-section ${
            isVisible ? "visible" : ""
          }`}
          style={{ gridColumn: "7 / span 6" }}
        >
          <p className="dogma-description text-4">
            A progressive coffee brand that challenges conventions.
            <br />
            DOGMA embodies the spirit of innovation and quality craftsmanship in
            every cup. From carefully sourced beans to meticulously designed
            spaces, DOGMA creates experiences that go beyond traditional coffee
            culture. The brand identity reflects this forward-thinking approach
            while maintaining warmth and approachability.
          </p>
        </div>
      </div>

      {/* DOGMA Content Gallery */}
      <DogmaContent />
    </div>
  );
}
