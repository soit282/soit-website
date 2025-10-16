import { useEffect, useState, useRef } from "react";
import UnAvailableContent from "./UnAvailableContent";
import "./UnAvailableWorkDetail.css";
import "@styles/grid-system.css";

export default function UnAvailableWorkDetail() {
  const [isVisible, setIsVisible] = useState(true); // Set to true immediately
  const sectionRef = useRef(null);

  useEffect(() => {
    // Optional: Add smooth entry animation with delay
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div ref={sectionRef} className="unavailable-work-detail">
      <div className="grid-container">
        {/* Title Section - Row 1 */}
        <div
          className={`unavailable-title-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 12" }}
        >
          <h1 className="unavailable-title text-2_100pt_medium">UnAvailable</h1>
        </div>

        {/* Client Section - Row 2 */}
        <div
          className={`unavailable-client-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 2" }}
        >
          <div className="detail-item">
            <span className="detail-label text-5">Client</span>
            <span className="detail-value text-6">UnAvailable</span>
          </div>
        </div>

        {/* Services Section - Row 2 */}
        <div
          className={`unavailable-details-section ${
            isVisible ? "visible" : ""
          }`}
          style={{ gridColumn: "3 / span 3" }}
        >
          <div className="detail-item">
            <span className="detail-label text-5">Scope of works</span>
            <span className="detail-value text-6">
              Brand Identity
              <br />
              Editorial Design
              <br />
              Signage & Wayfinding
              <br />
              Design Systems
            </span>
          </div>
        </div>

        {/* Description Section - Row 2 */}
        <div
          className={`unavailable-description-section ${
            isVisible ? "visible" : ""
          }`}
          style={{ gridColumn: "7 / span 6" }}
        >
          <p className="unavailable-description text-4">
            UnAvailable is a manufacturer specializing in high quality street &
            fashion garment based in HCMC, Vietnam.
            <br />
            The brand identity and tools were stripped back to UnAvailable’s
            essence “Creating an impact that matters”, leaving a bold yet simple
            color palette and a refined typographic system across all
            applications.
          </p>
        </div>
      </div>

      {/* UnAvailable Content Gallery */}
      <UnAvailableContent />
    </div>
  );
}
