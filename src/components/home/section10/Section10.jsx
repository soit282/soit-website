import { useEffect, useState, useRef } from "react";
import "./Section10.css";
import plusIcon from "/icon/Icon/+.svg";
import minusIcon from "/icon/Icon/-.svg";
import arrowIcon from "/icon/Icon/-_.svg";
import DecryptedText from "../../DecryptedText";

export default function Section10() {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 1,
      name: "Brand Strategy",
      content: [
        "Brand audits & competitive research",
        "Brand brief",
        "Positioning & value proposition",
        "Brand architecture & naming",
        "Tone of voice & messaging frameworks",
      ],
    },
    {
      id: 2,
      name: "Brand Identity",
      content: [
        "Visual identity systems",
        "Logo design",
        "Typography & color systems",
        "Brand guidelines",
      ],
    },
    {
      id: 3,
      name: "Campaign & Activation",
      content: [
        "Campaign strategy",
        "Creative direction",
        "Digital & print campaigns",
        "Event design",
      ],
    },
    {
      id: 4,
      name: "Advertising Design",
      content: [
        "Print advertising",
        "Digital advertising",
        "Social media campaigns",
        "Marketing materials",
      ],
    },
    {
      id: 5,
      name: "UI/UX",
      content: [
        "User experience design",
        "User interface design",
        "Prototyping & wireframing",
        "Usability testing",
      ],
    },
    {
      id: 6,
      name: "Editorial Design",
      content: [
        "Book & magazine design",
        "Annual reports",
        "Editorial art direction",
        "Typography systems",
      ],
    },
  ];

  const handleServiceClick = (serviceId) => {
    setActiveService(activeService === serviceId ? null : serviceId);
  };

  // Hover effects for service items
  useEffect(() => {
    const serviceHeaders = document.querySelectorAll(
      ".services-list .service-header"
    );

    serviceHeaders.forEach((item) => {
      let animationTimeout;
      let resetTimeout;
      let isHovering = false;
      let isOnRepeat = false;

      function startAnimation() {
        // Clear any existing timeouts
        clearTimeout(animationTimeout);
        clearTimeout(resetTimeout);

        // Remove previous states and start animation
        if (!isOnRepeat) {
          item.classList.remove("locked");
          item.classList.remove("reset");
          item.classList.add("animate");
        }

        // After animation completes
        animationTimeout = setTimeout(() => {
          item.classList.remove("animate");
          item.classList.add("locked");
          // After being locked for a moment
          resetTimeout = setTimeout(() => {
            // If still hovering, do nothing
            if (isHovering) {
              isOnRepeat = true;
            } else {
              // Otherwise reset to white
              item.classList.remove("locked");
              item.classList.add("reset");
              isOnRepeat = false;
            }
          }, 250);
        }, 500);
      }

      item.addEventListener("mouseenter", () => {
        isHovering = true;
        startAnimation();
      });

      item.addEventListener("mouseleave", () => {
        isHovering = false;
        isOnRepeat = false;
        item.classList.remove("locked");
        item.classList.add("reset");
        // Animation will complete and then reset to white
        // based on the isHovering flag in the timeout function
      });
    });
  }, []);

  return (
    <div className="section10">
      <div className="section10-content">
        <div className="section10-header">
          <p className="section10-label text-4">Services</p>
          <h2 className="section10-heading text-2_100pt_medium">
            <DecryptedText
              text="Through a vision-led approach, we've shaped ourselves into a deeply collaborative studio of cross-disciplinary thinkers and makers."
              speed={10}
              maxIterations={15}
              sequential={true}
              useOriginalCharsOnly={true}
              animateOn="view"
            />
          </h2>
        </div>

        <div className="services-list">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-item ${
                activeService === service.id ? "expanded grid-container" : ""
              }`}
              onClick={() => handleServiceClick(service.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="service-header">
                <span className="service-name text-5">{service.name}</span>
                <button
                  className={`toggle-btn ${
                    activeService === service.id ? "active" : ""
                  }`}
                >
                  {activeService === service.id ? (
                    <img
                      src={minusIcon}
                      alt="collapse"
                      className="minus-icon"
                    />
                  ) : (
                    <img src={plusIcon} alt="expand" className="plus-icon" />
                  )}
                </button>
              </div>
              <div
                className={`service-content ${
                  activeService === service.id ? "active" : ""
                }`}
              >
                {service.content.map((item, index) => (
                  <p key={index} className="text-6">
                    <img
                      src={arrowIcon}
                      alt="arrow"
                      className="content-arrow"
                    />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
