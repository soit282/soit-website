import { useEffect, useState, useRef } from "react";
import "./Section3.css";

export default function Section3() {
  const [textRevealProgress, setTextRevealProgress] = useState(0);
  const containerRef = useRef(null);
  const stickyRef = useRef(null);

  // Scroll reveal effect for sticky heading
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollHeight = container.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollHeight));

      // Text reveal progress (starts at 40% of scroll, ends at 70%)
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
    <div className="section3" ref={containerRef}>
      <div className="section3-sticky-wrapper" ref={stickyRef}>
        <div className="section3-content">
          <p className="section3-label text-4">Feature works</p>
          <h2 className="section3-heading text-2_100pt_medium">
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
      </div>
    </div>
  );
}
