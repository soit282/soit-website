import { useState } from "react";
import "./Footer.css";
import soitLogo from "/icon/Icon/soit-logo.svg";
import arrowIcon from "/icon/Icon/-_.svg";
import PrivacyPolicyModal from "../PrivacyPolicyModal";

export default function Footer({ theme = "dark" }) {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className={`footer footer-${theme}`}>
      <div className="footer-top">
        <div className="footer-left">
          <div className="footer-section">
            <p className="footer-label text-8">General Inquiries</p>
            <a
              href="mailto:here@soitstudio.com"
              className="footer-link text-5"
            >
              <img src={arrowIcon} alt="arrow" className="footer-arrow" />
              here@soitstudio.com
            </a>
            <a
              href="https://maps.google.com"
              className="footer-link text-5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={arrowIcon} alt="arrow" className="footer-arrow" />
              218/14 Bui Huu Nghia, Ward 2, HCMC
            </a>
          </div>

          <div className="footer-section social-section">
            <p className="footer-label text-8">
              Keep up to date on all things Sô It?
            </p>
            <a
              href="https://instagram.com/soit.team"
              className="footer-link text-5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={arrowIcon} alt="arrow" className="footer-arrow" />
              IG @soit.team
            </a>
            <a
              href="https://facebook.com/soitteam"
              className="footer-link text-5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={arrowIcon} alt="arrow" className="footer-arrow" />
              FB Số It
            </a>
            <a
              href="https://www.behance.net/soitstudio"
              className="footer-link text-5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={arrowIcon} alt="arrow" className="footer-arrow" />
              Be Soit Team
            </a>
          </div>
        </div>

        <div className="footer-logo">
          <img src={soitLogo} alt="Số Ít Logo" className="footer-logo-img" />
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright text-6">© So It Studio 2025</p>
        <p
          className="privacy-link text-6"
          onClick={() => setShowPrivacy(true)}
        >
          Privacy Policy
        </p>
      </div>

      <PrivacyPolicyModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        variant={5}
      />
    </footer>
  );
}
