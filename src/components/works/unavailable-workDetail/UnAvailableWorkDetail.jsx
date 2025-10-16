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
          <h1 className="unavailable-title text-2_100pt_medium">UNAVAILABLE</h1>
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
          className={`unavailable-details-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "3 / span 3" }}
        >
          <div className="detail-item">
            <span className="detail-label text-5">Scope of works</span>
            <span className="detail-value text-6">
              Brand Identity
              <br />
              Visual System
              <br />
              Art Direction
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
            A unique brand experience that captures the essence of unavailability.
            <br />
            UnAvailable represents a distinct approach to visual storytelling,
            creating memorable moments through carefully crafted design elements.
            The brand identity reflects this distinctive character while
            maintaining sophistication and contemporary appeal.
          </p>
        </div>
      </div>

      {/* UnAvailable Content Gallery */}
      <UnAvailableContent />
    </div>
  );
}
