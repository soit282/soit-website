import { useEffect, useState, useRef } from "react";
import "./Section2.css";
import ArrowButton from "../../common/ArrowButton";
import img1 from "../../../../public/1_Homepage/1_Homepage/1_Intro/Soit Web_Intro_1.jpg";
import img2 from "../../../../public/1_Homepage/1_Homepage/1_Intro/Soit Web_Intro_2.png";

// Shuffle text effect class
class SmoothShuffler {
  constructor(element, options = {}) {
    this.element = element;
    this.originalText = element.textContent;
    this.duration = options.duration || 400;
    this.shuffleCount = options.shuffleCount || 1;
    this.isAnimating = false;
  }

  shuffleString(str) {
    const arr = str.split("");
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
  }

  async shuffle() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    for (let i = 0; i < this.shuffleCount; i++) {
      const shuffled = this.shuffleString(this.originalText);
      this.element.textContent = shuffled;
      await this.delay(this.duration / (this.shuffleCount + 1));
    }

    this.element.textContent = this.originalText;
    this.isAnimating = false;
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  reset() {
    this.element.textContent = this.originalText;
  }
}

export default function Section2() {
  const [isVisible, setIsVisible] = useState(false);
  const [imagePositions, setImagePositions] = useState({
    left: null,
    right: null,
  });
  const sectionRef = useRef(null);
  const brandStrategyRef = useRef(null);
  const brandIdentityRef = useRef(null);
  const packagingDesignRef = useRef(null);
  const campaignsActivationsRef = useRef(null);
  const editorialDesignRef = useRef(null);
  const webAppRef = useRef(null);
  const creativeDevelopmentRef = useRef(null);
  const designSystemsRef = useRef(null);

  const shufflersRef = useRef({});

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

    // Initialize shuffle effects for all services
    const serviceRefs = [
      { ref: brandStrategyRef, key: "brandStrategy" },
      { ref: brandIdentityRef, key: "brandIdentity" },
      { ref: packagingDesignRef, key: "packagingDesign" },
      { ref: campaignsActivationsRef, key: "campaignsActivations" },
      { ref: editorialDesignRef, key: "editorialDesign" },
      { ref: webAppRef, key: "webApp" },
      { ref: creativeDevelopmentRef, key: "creativeDevelopment" },
      { ref: designSystemsRef, key: "designSystems" },
    ];

    serviceRefs.forEach(({ ref, key }) => {
      if (ref.current) {
        shufflersRef.current[key] = new SmoothShuffler(ref.current, {
          duration: 400,
          shuffleCount: 3,
        });
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener("resize", calculateImagePositions);
      clearTimeout(timer);
    };
  }, []);

  const createHoverHandlers = (serviceKey) => ({
    onMouseEnter: () => {
      if (shufflersRef.current[serviceKey]) {
        shufflersRef.current[serviceKey].shuffle();
      }
    },
    onMouseLeave: () => {
      if (shufflersRef.current[serviceKey]) {
        setTimeout(() => {
          shufflersRef.current[serviceKey].reset();
        }, 100);
      }
    },
  });

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
          <span className="tagline-first-service">
            <span
              className="shuffle-text"
              ref={brandStrategyRef}
              {...createHoverHandlers("brandStrategy")}
            >
              Brand Strategy
            </span>
            ,
          </span>{" "}
          <span>
            <span
              className="shuffle-text"
              ref={brandIdentityRef}
              {...createHoverHandlers("brandIdentity")}
            >
              Brand Identity
            </span>
            ,
          </span>
          <br />
          <span>
            <span
              className="shuffle-text"
              ref={packagingDesignRef}
              {...createHoverHandlers("packagingDesign")}
            >
              Packaging Design
            </span>
            ,
          </span>
          <br />
          <span>
            <span
              className="shuffle-text"
              ref={campaignsActivationsRef}
              {...createHoverHandlers("campaignsActivations")}
            >
              Campaigns & Activations
            </span>
            ,
          </span>
          <br />
          <span>
            <span
              className="shuffle-text"
              ref={editorialDesignRef}
              {...createHoverHandlers("editorialDesign")}
            >
              Editorial Design
            </span>
            ,{" "}
          </span>
          <span>
            <span
              className="shuffle-text"
              ref={webAppRef}
              {...createHoverHandlers("webApp")}
            >
              Web & App
            </span>
            ,
          </span>
          <br />
          <span>
            <span
              className="shuffle-text"
              ref={creativeDevelopmentRef}
              {...createHoverHandlers("creativeDevelopment")}
            >
              Creative Development
            </span>
            ,
          </span>
          <br />
          <span>
            <span
              className="shuffle-text"
              ref={designSystemsRef}
              {...createHoverHandlers("designSystems")}
            >
              Design Systems
            </span>
          </span>
        </div>

        {/* Services link */}
        <div className="services-link">
          <ArrowButton
            text="Services"
            onClick={() => (window.location.href = "#services")}
          />
        </div>

        {/* Scrolling text */}
        <div className="scrolling-text">
          <div className="scrolling-text-track">
            <div className="scrolling-text-content text-7_16pt_medium">
              Số Ít ≠ Số Nhiều. We're a design studio that believes in less -
              but better.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
