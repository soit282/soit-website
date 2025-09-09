import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <div className="footer-section">
            <p className="footer-label">General Inquiries</p>
            <a href="mailto:soitstudio.info@gmail.com" className="footer-link">
              ↗ soitstudio.info@gmail.com
            </a>
            <a href="https://maps.google.com" className="footer-link" target="_blank" rel="noopener noreferrer">
              ↗ 218/14 Bui Huu Nghia, Ward 2, HCMC
            </a>
          </div>
          
          <div className="footer-section social-section">
            <p className="footer-label">Keep up to date on all things Sô It?</p>
            <a href="https://instagram.com/soit.team" className="footer-link" target="_blank" rel="noopener noreferrer">
              ↗ IG @soit.team
            </a>
            <a href="https://facebook.com/soitteam" className="footer-link" target="_blank" rel="noopener noreferrer">
              ↗ FB Sô It
            </a>
            <a href="https://behance.net/soitteam" className="footer-link" target="_blank" rel="noopener noreferrer">
              ↗ Be Soit Team
            </a>
          </div>
        </div>
        
        <div className="footer-logo">
          <span className="logo-text">SOIT</span>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright">© So It Studio 2025</p>
        <p className="privacy-link">Privacy Policy</p>
      </div>
    </footer>
  );
}