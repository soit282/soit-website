import "./Section1.css";

const Section1 = () => {
  return (
    <section className="section1">
      {/* Logo positioned at bottom */}
      <div className="section1-logo-container">
        <img
          src="/icon/Icon/Số Ít logo.svg"
          alt="Số Ít"
          className="section1-logo"
        />
      </div>
    </section>
  );
};

export default Section1;
