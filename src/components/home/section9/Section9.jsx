import { useEffect, useState, useRef } from "react";
import "./Section9.css";
import "@styles/grid-system.css";
import ArrowButton from "@components/common/ArrowButton";

export default function Section9() {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const mousePositionRef = useRef({ x: null, y: null });

  const clients = [
    {
      id: 1,
      name: "OKKIO",
      logo: "/1_Homepage/1_Homepage/3_Clients/OKKIO_Logo.svg",
    },
    {
      id: 2,
      name: "Lêla",
      logo: "/1_Homepage/1_Homepage/3_Clients/Lêla_logo.svg",
    },
    {
      id: 3,
      name: "CTY",
      logo: "/1_Homepage/1_Homepage/3_Clients/CTY_logo.svg",
    },
    {
      id: 4,
      name: "TBros",
      logo: "/1_Homepage/1_Homepage/3_Clients/tra-made.svg",
    },
  ];

  // Check if mobile/tablet view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dynamic hover detection for carousel (skip on mobile)
  useEffect(() => {
    if (isMobile) return;

    let lastMouseX = null;
    let lastMouseY = null;

    const checkHover = () => {
      if (!carouselRef.current) return;

      // Use last known mouse position if available
      const mouseX =
        mousePositionRef.current.x !== null
          ? mousePositionRef.current.x
          : lastMouseX;
      const mouseY =
        mousePositionRef.current.y !== null
          ? mousePositionRef.current.y
          : lastMouseY;

      if (mouseX === null || mouseY === null) return;

      const cards = carouselRef.current.querySelectorAll(".client-card");
      let foundHover = false;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          setHoveredCardIndex(index);
          foundHover = true;
        }
      });

      if (!foundHover) {
        setHoveredCardIndex(null);
      }
    };

    const handleMouseMove = (e) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      checkHover();
    };

    const handleMouseEnter = (e) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      checkHover();
    };

    const handleMouseLeave = () => {
      mousePositionRef.current = { x: null, y: null };
      lastMouseX = null;
      lastMouseY = null;
      setHoveredCardIndex(null);
    };

    const handleScroll = () => {
      // Use last known mouse position during scroll
      if (lastMouseX !== null && lastMouseY !== null) {
        mousePositionRef.current = { x: lastMouseX, y: lastMouseY };
      }
      checkHover();
    };

    // Check hover continuously for carousel movement
    const interval = setInterval(checkHover, 100);

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    if (carouselRef.current) {
      carouselRef.current.addEventListener("mouseenter", handleMouseEnter);
      carouselRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("mouseenter", handleMouseEnter);
        carouselRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);

  // Helper functions for hover styles
  const getHoverBackground = (index) => {
    switch (index) {
      case 0:
        return "none";
      case 1:
        return "none";
      case 2:
        return `url("/1_Homepage/1_Homepage/3_Clients/soit_recent_work.svg")`;
      case 3:
        return `url("/1_Homepage/1_Homepage/3_Clients/DJI_0171.png")`;
      default:
        return `url('/1_Homepage/1_Homepage/3_Clients/Background_1.png')`;
    }
  };

  const getHoverColor = (index) => {
    switch (index) {
      case 0:
        return "#922b23";
      case 1:
        return "rgba(246, 194, 7, 1)";
      default:
        return "transparent";
    }
  };

  return (
    <div className="section9">
      <div className="section9-see-all">
        <ArrowButton text="See all" />
      </div>

      <div className="section9-container">
        <div className="section9-header">
          <p className="section9-label text-4">Clients</p>
          <h2 className="section9-heading text-2">
            We collaborate with brands that aim to stand out, scale up, and speak clearly in a digital-first world.
          </h2>
        </div>

        {isMobile ? (
          <div className="grid-container clients-grid">
            {clients.concat(clients, clients).map((client, index) => (
              <div key={`${client.id}-${index}`} className="col-2 col-sm-2">
                <div className="client-card">
                  <div className="client-background">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="client-logo"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="clients-carousel-wrapper" ref={carouselRef}>
            <div className="clients-carousel-track">
              {clients.concat(clients).map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className={`client-card ${
                    hoveredCardIndex === index ? "hovered" : ""
                  }`}
                  data-index={index % 4}
                >
                  <div
                    className="client-background"
                    style={{
                      backgroundImage:
                        hoveredCardIndex === index
                          ? getHoverBackground(index % 4)
                          : `url('/1_Homepage/1_Homepage/3_Clients/Background_1.png')`,
                      backgroundColor:
                        hoveredCardIndex === index
                          ? getHoverColor(index % 4)
                          : "transparent",
                    }}
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="client-logo"
                      style={
                        hoveredCardIndex === index && index % 4 === 0
                          ? { filter: "invert(1) brightness(2)" }
                          : {}
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
