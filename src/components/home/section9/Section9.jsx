import { useEffect, useState, useRef } from "react";
import "./Section9.css";
import ArrowButton from "@components/common/ArrowButton";

export default function Section9() {
  const [textRevealProgress, setTextRevealProgress] = useState(0);
  const containerRef = useRef(null);
  const stickyRef = useRef(null);

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
    {
      id: 5,
      name: "OKKIO",
      logo: "/1_Homepage/1_Homepage/3_Clients/OKKIO_Logo.svg",
    },
    {
      id: 6,
      name: "Lêla",
      logo: "/1_Homepage/1_Homepage/3_Clients/Lêla_logo.svg",
    },
    {
      id: 7,
      name: "CTY",
      logo: "/1_Homepage/1_Homepage/3_Clients/CTY_logo.svg",
    },
    {
      id: 8,
      name: "TBros",
      logo: "/1_Homepage/1_Homepage/3_Clients/tra-made.svg",
    },
  ];

  // Scroll reveal effect for sticky heading
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollHeight = container.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollHeight));

      // Text reveal progress (starts at 40% of scroll, ends at 70%)
      // Điều chỉnh 0.4 = bắt đầu ở 40% scroll
      // Điều chỉnh 0.3 = khoảng cách từ start đến end (40% -> 70% = 30% = 0.3)
      if (progress > 0.4) {
        const revealProgress = (progress - 0.4) / 0.3;
        setTextRevealProgress(Math.min(1, revealProgress));
      } else {
        setTextRevealProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Split heading text for character-by-character reveal
  const headingText = "We collaborate with brands that aim to stand out, scale up, and speak clearly in a digital-first world.";

  return (
    <div className="section9" ref={containerRef}>
      <div className="section9-see-all">
        <ArrowButton text="See all" />
      </div>

      <div className="section9-sticky-wrapper" ref={stickyRef}>
        <div className="section9-container">
          <div className="section9-header">
            <p className="section9-label text-4">Clients</p>
            <h2 className="section9-heading text-2">
              {headingText.split("").map((char, index) => {
                const charProgress = (index + 1) / headingText.length;
                const isRevealed = textRevealProgress >= charProgress;

                return (
                  <span
                    key={index}
                    style={{
                      color: isRevealed ? "#1F1F1F" : "#E0E0E0",
                      transition: "color 0.05s ease",
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </h2>
          </div>

          <div className="clients-carousel-wrapper">
            <div className="clients-carousel-track">
              {/* Show only first 4 items initially, duplicate for seamless loop */}
              {clients.slice(0, 4).concat(clients.slice(0, 4)).map((client, index) => (
                <div key={`${client.id}-${index}`} className="client-card">
                  <div
                    className="client-background"
                    style={{
                      backgroundImage: `url('/1_Homepage/1_Homepage/3_Clients/Background_1.png')`,
                    }}
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="client-logo"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
