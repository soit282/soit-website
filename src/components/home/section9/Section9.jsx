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
  ];

  // Scroll reveal effect for sticky heading
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollHeight = container.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollHeight));

      // Text reveal progress (starts at 45% of scroll, ends at 80%)
      // Điều chỉnh 0.45 = bắt đầu ở 45% scroll
      // Điều chỉnh 0.35 = khoảng cách từ start đến end (45% -> 80% = 35% = 0.35)
      if (progress > 0.45) {
        const revealProgress = (progress - 0.45) / 0.35;
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

          <div className="clients-grid">
            {clients.map((client) => (
              <div key={client.id} className="client-card">
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
  );
}
