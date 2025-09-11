import './Footer.css';
import soitLogo from '/icon/Icon/Số Ít logo.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <div className="footer-section">
            <p className="footer-label text-8">General Inquiries</p>
            <a href="mailto:soitstudio.info@gmail.com" className="footer-link text-5">
              ↗ soitstudio.info@gmail.com
            </a>
            <a href="https://maps.google.com" className="footer-link text-5" target="_blank" rel="noopener noreferrer">
              ↗ 218/14 Bui Huu Nghia, Ward 2, HCMC
            </a>
          </div>
          
          <div className="footer-section social-section">
            <p className="footer-label text-8">Keep up to date on all things Sô It?</p>
            <a href="https://instagram.com/soit.team" className="footer-link text-5" target="_blank" rel="noopener noreferrer">
              ↗ IG @soit.team
            </a>
            <a href="https://facebook.com/soitteam" className="footer-link text-5" target="_blank" rel="noopener noreferrer">
              ↗ FB Sô It
            </a>
            <a href="https://behance.net/soitteam" className="footer-link text-5" target="_blank" rel="noopener noreferrer">
              ↗ Be Soit Team
            </a>
          </div>
        </div>
        
        <div className="footer-logo">
          <img src={soitLogo} alt="Số Ít Logo" className="footer-logo-img" />
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright text-6">© So It Studio 2025</p>
        <p className="privacy-link text-6">Privacy Policy</p>
      </div>
    </footer>
  );
}