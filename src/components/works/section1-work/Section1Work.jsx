import { useEffect, useState, useRef } from "react";
import "./Section1Work.css";

// Shuffle text effect class (copied from Section2)
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

export default function Section1Work() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Service refs
  const brandStrategyRef = useRef(null);
  const brandIdentityRef = useRef(null);
  const packagingDesignRef = useRef(null);
  const editorialDesignRef = useRef(null);
  const campaignsActivationsRef = useRef(null);
  const webAppRef = useRef(null);
  const creativeDevelopmentRef = useRef(null);
  const designSystemsRef = useRef(null);

  const shufflersRef = useRef({});

  useEffect(() => {
    // Intersection Observer for fade-in effect
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = sectionRef.current;
    if (element) {
      observer.observe(element);
    }

    // Initialize shuffle effects for all services
    const serviceRefs = [
      { ref: brandStrategyRef, key: "Brand Strategy" },
      { ref: brandIdentityRef, key: "Brand Identity" },
      { ref: packagingDesignRef, key: "Packaging Design" },
      { ref: editorialDesignRef, key: "Editorial Design" },
      { ref: campaignsActivationsRef, key: "Campaigns & Activations" },
      { ref: webAppRef, key: "Web & App" },
      { ref: creativeDevelopmentRef, key: "Creative Development" },
      { ref: designSystemsRef, key: "Design Systems" },
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
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
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
    <section ref={sectionRef} className="section1-work">
      <div className="section1-work-container">
        <div
          className={`section1-work-content text-2 ${
            isVisible ? "visible" : ""
          }`}
        >
          <span className="work-service-text" {...createHoverHandlers("Brand Strategy")}>
            <span
              className="shuffle-text"
              ref={brandStrategyRef}
            >
              Brand Strategy
            </span><span className="comma">,</span>
          </span>{" "}
          <span className="work-service-text" {...createHoverHandlers("Brand Identity")}>
            <span
              className="shuffle-text"
              ref={brandIdentityRef}
            >
              Brand Identity
            </span><span className="comma">,</span>
          </span><br />
          <span className="work-service-text" {...createHoverHandlers("Packaging Design")}>
            <span
              className="shuffle-text"
              ref={packagingDesignRef}
            >
              Packaging Design
            </span><span className="comma">,</span>
          </span>{" "}
          <span className="work-service-text" {...createHoverHandlers("Editorial Design")}>
            <span
              className="shuffle-text"
              ref={editorialDesignRef}
            >
              Editorial Design
            </span><span className="comma">,</span>
          </span><br />
          <span className="work-service-text" {...createHoverHandlers("Campaigns & Activations")}>
            <span
              className="shuffle-text"
              ref={campaignsActivationsRef}
            >
              Campaigns & Activations
            </span><span className="comma">,</span>
          </span><br />
          <span className="work-service-text" {...createHoverHandlers("Web & App")}>
            <span
              className="shuffle-text"
              ref={webAppRef}
            >
              Web & App
            </span><span className="comma">,</span>
          </span>{" "}
          <span className="work-service-text" {...createHoverHandlers("Creative Development")}>
            <span
              className="shuffle-text"
              ref={creativeDevelopmentRef}
            >
              Creative Development
            </span><span className="comma">,</span>
          </span><br />
          <span className="work-service-text" {...createHoverHandlers("Design Systems")}>
            <span
              className="shuffle-text"
              ref={designSystemsRef}
            >
              Design Systems
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}