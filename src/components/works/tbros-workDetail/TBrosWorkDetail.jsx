import { useEffect, useState, useRef } from "react";
import TBrosContent from "./TBrosContent";
import "./TBrosWorkDetail.css";
import "@styles/grid-system.css";

export default function TBrosWorkDetail() {
  const [isVisible, setIsVisible] = useState(true); // Set to true immediately
  const sectionRef = useRef(null);

  useEffect(() => {
    // Optional: Add smooth entry animation with delay
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div ref={sectionRef} className="tbros-work-detail">
      <div className="grid-container">
        {/* Title Section - Row 1 */}
        <div
          className={`tbros-title-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 12" }}
        >
          <h1 className="tbros-title text-2_100pt_medium">TBros</h1>
        </div>

        {/* Client Section - Row 2 */}
        <div
          className={`tbros-client-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "1 / span 2" }}
        >
          <div className="detail-item">
            <span className="detail-label text-5">Client</span>
            <span className="detail-value text-6">Anh em cacao</span>
          </div>
        </div>

        {/* Services Section - Row 2 */}
        <div
          className={`tbros-details-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "3 / span 3" }}
        >
          <div className="detail-item">
            <span className="detail-label text-5">Scope of works</span>
            <span className="detail-value text-6">
              Brand Identity
              <br />
              Packaging Design
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
          className={`tbros-description-section ${isVisible ? "visible" : ""}`}
          style={{ gridColumn: "7 / span 6" }}
        >
          <p className="tbros-description text-4">
            <span className="description-line">
              Tbros is a pioneer in Vietnamese chocolate-making, rooted in the
              fertile cacao-growing regions of Vietnam. With a deep respect for
              local heritage and sustainable practices, TBros collaborates
              closely with smallholder farmers to craft premium, ethically
              sourced chocolates that reflect the richness of Vietnamese soil
              and culture.
            </span>
            <span className="description-line">
              Every cacao bean used in Tbros products carries the vibrant energy
              of Vietnam, absorbed from the country’s tropical climate and the
              hands of dedicated farmers. The brand embraces a philosophy of
              harmony—balancing nature, craftsmanship, and innovation to create
              chocolates that tell a story of authenticity and bold creativity.
            </span>
          </p>
        </div>
      </div>

      {/* TBROS Content Gallery */}
      <TBrosContent />
    </div>
  );
}
