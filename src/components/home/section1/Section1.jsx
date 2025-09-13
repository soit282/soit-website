import './Section1.css';

const Section1 = () => {
  return (
    <section className="section1">
      <h1>Section 1</h1>
      <p>Content for section 1</p>

      {/* Logo positioned at bottom */}
      <div className="section1-logo-container">
        <img src="/icon/Icon/Số Ít logo.svg" alt="Số Ít" className="section1-logo" />
      </div>
    </section>
  );
};

export default Section1;