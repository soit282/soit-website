import { useState, useEffect, useRef } from "react";
import "./Section11.css";
import arrowIcon from "/icon/Icon/→.svg";
import dropDownIcon from "/icon/Icon/drop_down.svg";
import ArrowButton from "@components/common/ArrowButton";

export default function Section11() {
  const [showFooter, setShowFooter] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const expandedRef = useRef(null);

  const offerings = [
    {
      id: 1,
      title: "Brand Check-up",
      tags: ["3 sessions", "12 days"],
      description:
        "A focused brand audit with our experienced consultant - designed to clarify, assess, and align your brand for what's next.",
      bgPattern: "dots",
      linkText: "Start now",
    },
    {
      id: 2,
      title: "Ultra Identity",
      tags: ["5 sessions", "30 days"],
      description:
        "Offers a more flexible, layered identity system — giving you the freedom to adapt across platforms, products, and growth phases while staying recognizably you.",
      bgPattern: "grid",
      linkText: "Start now",
    },
    {
      id: 3,
      title: "Full Brand Suite",
      tags: ["12 sessions", "90 days"],
      description:
        "A comprehensive rebrand designed to scale with you. From foundational strategy to refined design, we craft a cohesive system that's beautiful, bold, and built to grow.",
      bgPattern: "diagonal",
      linkText: "Start now",
      featured: true,
    },
  ];

  const handleCardClick = (serviceTitle) => {
    if (showFooter && selectedService === serviceTitle) {
      // If clicking the same card that's already selected, toggle off
      setShowFooter(false);
      setSelectedService("");
    } else {
      // If clicking a different card or no card selected, show footer
      setSelectedService(serviceTitle);
      setShowFooter(true);
    }
  };

  // Custom smooth scroll function with adjustable speed
  const smoothScroll = (element, duration = 1500) => {
    const offset = -100; // Offset để scroll cao hơn 100px
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function for smoother animation
      const easeInOutCubic = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + distance * easeInOutCubic);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  };

  // Scroll to expanded section when it appears
  useEffect(() => {
    if (showFooter && expandedRef.current) {
      setTimeout(() => {
        smoothScroll(expandedRef.current, 1500); // 1.5 seconds duration
      }, 100); // Small delay to ensure DOM is updated
    }
  }, [showFooter]);

  return (
    <section className="section11">
      <div className="section11-header">
        <h1 className="section11-title text-2_100pt_medium">
          Hello!
          <br />
          Looking to rebrand or get
          <br />a brand check-up?
        </h1>
        <div className="arrow-down">
          <img src={arrowIcon} alt="arrow down" className="arrow-icon" />
        </div>
      </div>

      <div className="offerings-grid">
        {offerings.map((offering) => (
          <div
            key={offering.id}
            className={`offering-card ${
              offering.featured ? "featured" : ""
            } pattern-${offering.bgPattern}`}
            onClick={() => handleCardClick(offering.title)}
          >
            <div className="offering-header">
              <p className="offering-subtitle text-8">A solid first step</p>
              <h3 className="offering-title text-5">{offering.title}</h3>
              <div className="offering-tags">
                {offering.tags.map((tag, index) => (
                  <span key={index} className="offering-tag text-8">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="offering-content">
              <p className="offering-description text-4">
                {offering.description}
              </p>
              <ArrowButton
                text={offering.linkText}
                className="offering-arrow-button"
              />
            </div>
          </div>
        ))}
      </div>

      {showFooter && (
        <div className="section11-expanded" ref={expandedRef}>
          <div className="expanded-content">
            <div className="footer-text-section">
              <p className="footer-line1 text-2">
                We are <span className="contact-info">[Company Name]</span> and
              </p>
              <p className="footer-line2 text-2">
                we'd love to discuss{" "}
                <span className="dropdown-wrapper">
                  <select
                    className="service-dropdown contact-info text-2"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="Brand Check-up">Brand Check-up</option>
                    <option value="Ultra Identity">Ultra Identity</option>
                    <option value="Full Brand Suite">Full Brand Suite</option>
                  </select>
                  <img
                    src={dropDownIcon}
                    alt="dropdown"
                    className="dropdown-arrow"
                  />
                </span>
              </p>
              <p className="contact-text text-2">
                Please feel free to reach us at
                <br />
                <span className="contact-info">[phone number]</span> or{" "}
                <span className="contact-info">[email]</span>.
              </p>
            </div>
            <div className="submit-section">
              <ArrowButton text="Submit" className="submit-arrow-button" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
