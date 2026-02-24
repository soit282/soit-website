import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./PrivacyPolicyModal.css";

const sections = [
  {
    title: "What We Collect",
    text: "Only what you share with us — your name, email, and phone number through our contact and service inquiry forms. No cookies for tracking or advertising. Ever.",
  },
  {
    title: "How We Use It",
    text: "Solely to respond to your inquiries and deliver the services you've requested. We don't sell, rent, or share your personal information with third parties.",
  },
  {
    title: "Third Parties",
    text: "Our forms are processed through FormSubmit for delivery. No data is stored by third-party services beyond what is necessary for email delivery.",
  },
  {
    title: "Get in Touch",
    text: "Questions about this policy? Reach out at",
    email: "here@soitstudio.com",
  },
];

function CloseButton({ onClick, className = "" }) {
  return (
    <button className={`pp-close ${className}`} onClick={onClick} aria-label="Close">
      &#x2715;
    </button>
  );
}

function SectionText({ section }) {
  return (
    <p className="text-8">
      {section.text}
      {section.email && (
        <> <a href={`mailto:${section.email}`}>{section.email}</a></>
      )}
    </p>
  );
}

/* ─── Version 1: Bottom Sheet ─── */
function V1({ isOpen, onClose }) {
  return (
    <div className="pp-panel pp-v1">
      <div className="pp-v1-inner">
        <header className="pp-v1-header">
          <h2 className="text-4">Privacy Policy</h2>
          <CloseButton onClick={onClose} />
        </header>
        <div className="pp-v1-body">
          <p className="pp-meta text-8">Last updated: February 2026</p>
          {sections.map((s, i) => (
            <div key={i} className="pp-v1-section">
              <h3 className="text-6">{s.title}</h3>
              <SectionText section={s} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Version 2: Centered Card + Numbered ─── */
function V2({ isOpen, onClose }) {
  return (
    <div className="pp-panel pp-v2">
      <div className="pp-v2-inner">
        <header className="pp-v2-header">
          <div>
            <span className="pp-tag text-8">Legal</span>
            <h2 className="pp-v2-title text-3">Privacy Policy</h2>
          </div>
          <CloseButton onClick={onClose} className="pp-close-bordered" />
        </header>
        <div className="pp-v2-grid">
          {sections.map((s, i) => (
            <div
              key={i}
              className="pp-v2-item"
              style={{ transitionDelay: isOpen ? `${(i + 1) * 0.08}s` : "0s" }}
            >
              <div className="pp-v2-num text-8">{String(i + 1).padStart(2, "0")}</div>
              <div className="pp-v2-content">
                <h3 className="text-5">{s.title}</h3>
                <SectionText section={s} />
              </div>
            </div>
          ))}
        </div>
        <footer className="pp-v2-footer">
          <span className="text-8">Last updated February 2026</span>
          <span className="text-8">soitstudio.com</span>
        </footer>
      </div>
    </div>
  );
}

/* ─── Version 3: Full-Screen Split ─── */
function V3({ isOpen, onClose }) {
  return (
    <div className="pp-panel pp-v3">
      <div className="pp-v3-left">
        <span className="pp-tag text-8">Legal</span>
        <h2 className="pp-v3-title text-1">Privacy<br />Policy</h2>
        <span className="pp-meta text-8">February 2026</span>
      </div>
      <div className="pp-v3-right">
        <CloseButton onClick={onClose} />
        <div className="pp-v3-body">
          {sections.map((s, i) => (
            <div
              key={i}
              className="pp-v3-item"
              style={{ transitionDelay: isOpen ? `${(i + 1) * 0.1}s` : "0s" }}
            >
              <span className="pp-v3-num text-8">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-5">{s.title}</h3>
              <SectionText section={s} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Version 4: Right Drawer ─── */
function V4({ isOpen, onClose }) {
  return (
    <div className="pp-panel pp-v4">
      <div className="pp-v4-edge">
        <span className="pp-v4-edge-text text-8">Privacy Policy</span>
      </div>
      <div className="pp-v4-content">
        <header className="pp-v4-header">
          <h2 className="text-4">Privacy Policy</h2>
          <CloseButton onClick={onClose} />
        </header>
        <div className="pp-v4-body">
          {sections.map((s, i) => (
            <div
              key={i}
              className="pp-v4-item"
              style={{ transitionDelay: isOpen ? `${(i + 1) * 0.06}s` : "0s" }}
            >
              <div className="pp-v4-item-header">
                <span className="pp-v4-dot" />
                <h3 className="text-6">{s.title}</h3>
              </div>
              <SectionText section={s} />
            </div>
          ))}
        </div>
        <footer className="pp-v4-footer text-8">
          <span>Last updated February 2026</span>
        </footer>
      </div>
    </div>
  );
}

/* ─── Version 5: Horizontal Cards ─── */
function V5({ isOpen, onClose }) {
  return (
    <div className="pp-panel pp-v5">
      <header className="pp-v5-header">
        <div>
          <span className="pp-tag text-8">Legal</span>
          <h2 className="text-3">Privacy Policy</h2>
        </div>
        <CloseButton onClick={onClose} className="pp-close-bordered" />
      </header>
      <div className="pp-v5-track">
        {sections.map((s, i) => (
          <div
            key={i}
            className="pp-v5-card"
            style={{ transitionDelay: isOpen ? `${(i + 1) * 0.1}s` : "0s" }}
          >
            <div className="pp-v5-card-num text-1">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="text-5">{s.title}</h3>
            <SectionText section={s} />
          </div>
        ))}
      </div>
    </div>
  );
}

const variants = { 1: V1, 2: V2, 3: V3, 4: V4, 5: V5 };

export default function PrivacyPolicyModal({ isOpen, onClose, variant = 5 }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  const Variant = variants[variant] || V2;

  return createPortal(
    <div
      ref={modalRef}
      className={`pp-overlay pp-overlay-v${variant} ${isOpen ? "open" : ""}`}
      onClick={handleOverlayClick}
    >
      <Variant isOpen={isOpen} onClose={onClose} />
    </div>,
    document.body
  );
}
