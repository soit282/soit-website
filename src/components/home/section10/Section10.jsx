import { useEffect, useState } from "react";
import "./Section10.css";


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
    const serviceItems = document.querySelectorAll(".service-item");

    serviceItems.forEach((item) => {
      // Logic from user's provided code in Step 329, but applied to the ITEM not the HEADER
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
        // Animate regardless of expansion state
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
    <div className="section10" id="services">
      <div className="section10-content">
        <div className="section10-header">
          {/* Added Services h2 to match old design if needed, or keeping it compatible.
               Old design had <h2>Services</h2> and <p>desc</p>.
               Current design has the Animated Text. I will keep Animated Text as requested "keep content".
           */}
          <p className="section10-label text-4">Services</p>
          <h2 className="section10-heading text-2">
            Through a vision-led approach, we've shaped ourselves into a deeply collaborative studio of cross-disciplinary thinkers and makers.
          </h2>
        </div>

        <div className="services-accordion">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-item ${activeService === service.id ? "expanded" : ""}`}
            >
              <div
                className="service-header"
                onClick={() => handleServiceClick(service.id)}
              >
                <span className="service-name text-5">{service.name}</span>
                <button className={`toggle-btn ${activeService === service.id ? "active" : ""}`}>
                  {activeService === service.id ? "-" : "+"}
                </button>
              </div>
              <div
                className={`service-content ${activeService === service.id ? "active" : ""}`}
              >
                {service.content.map((item, index) => (
                  <p key={index}>
                    &#8599; {item}
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
