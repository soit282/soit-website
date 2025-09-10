import { useEffect, useState, useRef } from "react";
import "./Section2.css";
import ArrowButton from "../../common/ArrowButton";
import img1 from "../../../../public/1_Homepage/1_Homepage/1_Intro/Soit Web_Intro_1.jpg";
import img2 from "../../../../public/1_Homepage/1_Homepage/1_Intro/Soit Web_Intro_2.png";

export default function Section2() {
  const [isVisible, setIsVisible] = useState(false);
  const [imagePositions, setImagePositions] = useState({
    left: null,
    right: null,
  });
  const sectionRef = useRef(null);

  const services = [
    "Brand Strategy",
    "Brand Identity",
    "Packaging Design",
    "Campaigns & Activations",
    "Editorial Design",
    "Web & App",
    "Creative Development",
    "Design Systems",
  ];

  // Removed handleServiceHover as we'll use CSS hover directly

  useEffect(() => {
    // Calculate image positions based on text content
    const calculateImagePositions = () => {
      const independentText = document.querySelector(".tagline-highlight-1");
      const makersText = document.querySelector(".tagline-highlight-2");

      if (independentText && makersText) {
        const independentRect = independentText.getBoundingClientRect();
        const makersRect = makersText.getBoundingClientRect();
        const containerRect = sectionRef.current?.getBoundingClientRect();

        if (containerRect) {
          setImagePositions({
            left: {
              top: independentRect.top - containerRect.top - 20,
              left: independentRect.left - containerRect.left - 160,
            },
            right: {
              top: makersRect.top - containerRect.top - 20,
              left: makersRect.right - containerRect.left + 20,
            },
          });
        }
      }
    };

    // Intersection Observer for fade-in effect
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          calculateImagePositions();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Recalculate on resize
    window.addEventListener("resize", calculateImagePositions);

    // Initial calculation after a short delay to ensure DOM is ready
    const timer = setTimeout(calculateImagePositions, 100);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener("resize", calculateImagePositions);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-tagline-section">
      <div className="hero-tagline">
        {/* Side images */}
        <div
          className={`tagline-image-left ${isVisible ? "visible" : ""}`}
          style={
            imagePositions.left
              ? {
                  top: `${imagePositions.left.top}px`,
                  left: `${imagePositions.left.left}px`,
                }
              : {}
          }
        >
          <img src={img1} alt="Tagline image 1" />
        </div>
        <div
          className={`tagline-image-right ${isVisible ? "visible" : ""}`}
          style={
            imagePositions.right
              ? {
                  top: `${imagePositions.right.top}px`,
                  left: `${imagePositions.right.left}px`,
                }
              : {}
          }
        >
          <img src={img2} alt="Tagline image 2" />
        </div>

        {/* Main content */}
        <div
          className={`tagline-main text-2_100pt_medium ${
            isVisible ? "visible" : ""
          }`}
        >
          As a fiercely <span className="tagline-highlight-1">independent</span>
          <br />
          design and technology
          <br />
          studio in Saigon.
        </div>
        <div
          className={`tagline-sub text-2_100pt_medium ${
            isVisible ? "visible" : ""
          }`}
        >
          Số Ít crafts research - driven
          <br />
          solutions across
        </div>
        <div
          className={`tagline-fade text-2_100pt_medium ${
            isVisible ? "visible" : ""
          }`}
        >
          <span className="tagline-first-service">Brand Strategy, </span>{" "}
          <span>Brand Identity,</span>
          <br />
          <span>Packaging Design,</span>
          <br />
          <span>Campaigns & Activations,</span>
          <br />
          <span>Editorial Design, </span> <span>Web & App,</span>
          <br />
          <span>Creative Development,</span>
          <br />
          <span>Design Systems</span>
        </div>

        {/* Services link */}
        <div className="services-link">
          <ArrowButton 
            text="Services" 
            onClick={() => window.location.href = "#services"}
          />
        </div>

        {/* Scrolling text */}
        <div className="scrolling-text">
          <div className="scrolling-text-content text-7_16pt_medium">
            Số Ít ≠ Số Nhiều. We're a design studio that believes in less - but
            better.
          </div>
        </div>
      </div>
    </section>
  );
}
