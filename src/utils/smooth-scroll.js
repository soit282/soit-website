/**
 * Smooth Scroll Utility - Lenis-style approach
 * Ultra smooth scrolling using RAF and lerp
 */

export class SmoothScroll {
  constructor(options = {}) {
    this.targetScroll = 0;
    this.currentScroll = 0;
    this.ease = options.ease || 0.075;
    this.isRunning = false;
    this.rafId = null;

    this.init();
  }

  init() {
    // Initialize scroll position
    this.currentScroll = window.scrollY;
    this.targetScroll = window.scrollY;
    this.isDraggingScrollbar = false;

    // Intercept wheel events
    this.handleWheel = (e) => {
      e.preventDefault();
      this.targetScroll += e.deltaY;
      this.clampTarget();
    };

    // Use non-passive listener to prevent default
    window.addEventListener("wheel", this.handleWheel, { passive: false });

    // Detect scrollbar dragging
    this.scrollTimeout = null;
    let lastScrollY = window.scrollY;

    this.handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY);

      // If scroll changed significantly and not from our animation, user is dragging
      if (diff > 50 && Math.abs(currentScrollY - this.currentScroll) > 50) {
        this.isDraggingScrollbar = true;
        this.targetScroll = currentScrollY;
        this.currentScroll = currentScrollY;
      }

      lastScrollY = currentScrollY;

      // Reset dragging flag after user stops
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        this.isDraggingScrollbar = false;
      }, 150);
    };
    window.addEventListener("scroll", this.handleScroll, { passive: true });

    // Handle resize
    this.handleResize = () => {
      this.clampTarget();
    };
    window.addEventListener("resize", this.handleResize);

    // Prevent scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    this.start();
  }

  clampTarget() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    this.targetScroll = Math.max(0, Math.min(this.targetScroll, maxScroll));
  }

  // Public method to scroll to a specific position
  scrollTo(targetY) {
    this.targetScroll = targetY;
    this.clampTarget();
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  animate() {
    if (!this.isRunning) return;

    // Smooth lerp
    this.currentScroll = this.lerp(this.currentScroll, this.targetScroll, this.ease);

    // Snap when very close
    if (Math.abs(this.targetScroll - this.currentScroll) < 0.01) {
      this.currentScroll = this.targetScroll;
    }

    // Apply scroll (skip if user is actively dragging scrollbar)
    if (!this.isDraggingScrollbar) {
      window.scrollTo(0, this.currentScroll);
    }

    // Always apply parallax
    this.applyParallax();

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  applyParallax() {
    if (window.innerWidth <= 1024) return;

    const parallaxElements = document.querySelectorAll("[data-parallax]");
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const yPos = -this.currentScroll * speed;
      el.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }

  destroy() {
    this.stop();

    if (this.handleWheel) {
      window.removeEventListener("wheel", this.handleWheel);
    }
    if (this.handleScroll) {
      window.removeEventListener("scroll", this.handleScroll);
    }
    if (this.handleResize) {
      window.removeEventListener("resize", this.handleResize);
    }

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }

    const parallaxElements = document.querySelectorAll("[data-parallax]");
    parallaxElements.forEach((el) => {
      el.style.transform = "";
    });
  }
}

export default SmoothScroll;
