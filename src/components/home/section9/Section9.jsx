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
      name: "matchie",
      logo: "/1_Homepage/1_Homepage/3_Clients/Matchie_logo.svg",
      hoverBg: "/1_Homepage/1_Homepage/3_Clients/matchie-hover-bg.png",
      logoWidth: "57%",   // 155.81 / 274
    },
    {
      id: 2,
      name: "CTY Kitchen + Bar",
      logo: "/1_Homepage/1_Homepage/3_Clients/CTY_logo.svg",
      hoverBg: "/1_Homepage/1_Homepage/3_Clients/cty-hover-bg.png",
      logoWidth: "36%",   // 99 / 274
    },
    {
      id: 3,
      name: "Circular Plastics Company",
      logo: "/1_Homepage/1_Homepage/3_Clients/cpc-logo-full.svg",
      hoverBg: "/1_Homepage/1_Homepage/3_Clients/cpc-hover-bg.png",
      logoWidth: "69%",   // 187.92 / 274
    },
    {
      id: 4,
      name: "OKKIO",
      logo: "/1_Homepage/1_Homepage/3_Clients/OKKIO_Logo.svg",
      hoverBg: "/1_Homepage/1_Homepage/3_Clients/okkio-hover-bg.png",
      logoWidth: "49%",   // 132.98 / 274
    },
    {
      id: 5,
      name: "EUPHORIA",
      logo: "/1_Homepage/1_Homepage/3_Clients/Euphoria_logo.svg",
      hoverBg: "/1_Homepage/1_Homepage/3_Clients/euphoria-hover-bg.png",
      logoWidth: "71%",   // 194 / 274
    },
    {
      id: 6,
      name: "Dogma",
      logo: "/1_Homepage/1_Homepage/3_Clients/Dogma_logo.svg",
      hoverBg: "/1_Homepage/1_Homepage/3_Clients/dogma-hover-bg.png",
      logoWidth: "49%",   // 135 / 274
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

  const clientCount = clients.length;

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
              {clients.concat(clients).map((client, index) => {
                const isHovered = hoveredCardIndex === index;
                return (
                  <div
                    key={`${client.id}-${index}`}
                    className={`client-card ${isHovered ? "hovered" : ""}`}
                    data-index={index % clientCount}
                  >
                    <div
                      className="client-background"
                      style={{
                        backgroundImage: isHovered
                          ? `url("${client.hoverBg}")`
                          : `url('/1_Homepage/1_Homepage/3_Clients/Background_1.png')`,
                      }}
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="client-logo"
                        style={{
                          width: client.logoWidth,
                          ...(isHovered
                            ? { filter: "brightness(0) invert(1)" }
                            : {}),
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
