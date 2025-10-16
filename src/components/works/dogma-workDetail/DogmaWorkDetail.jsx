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
          <h1 className="dogma-title text-2_100pt_medium">Dogma Collection</h1>
        </div>

        {/* Client Section - Row 2 */}
        <div
          className={`dogma-client-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 2" }}
        >
          <div className="detail-item">
            <span className="detail-label text-5">Client</span>
            <span className="detail-value text-6">Dogma</span>
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
              Social Media Materials
              <br />
              Web & App
              <br />
              Design Systems
            </span>
          </div>
        </div>

        {/* Description Section - Row 2 */}
        <div
          className={`dogma-description-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "7 / span 6" }}
        >
          <p className="dogma-description text-4">
            Rebrand for Dogma, a cultural platform preserving Vietnam’s heritage
            while fostering artistic expression. Time & Voices concept balances
            tradition and innovation, highlighting archival preservation and
            evolving narratives.
          </p>
        </div>
      </div>

      {/* DOGMA Content Gallery */}
      <DogmaContent />
    </div>
  );
}
