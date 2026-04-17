import Section1 from "@components/home/section1/Section1";
import Section2 from "@components/home/section2/Section2";
import Section3 from "@components/home/section3/Section3";
import Section4 from "@components/home/section4/Section4";
import Section5 from "@components/home/section5/Section5";
import Section6 from "@components/home/section6/Section6";
import SectionSavvy from "@components/home/section-savvy/SectionSavvy";
import Section7 from "@components/home/section7/Section7";
import Section8 from "@components/home/section8/Section8";
import Section9 from "@components/home/section9/Section9";
import Section10 from "@components/home/section10/Section10";
import ServiceOffer from "@components/services/ServiceOffer";
import Footer from "@components/footer/Footer";
import Navbar from "@components/navbar/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="home-page">
        {/* <Section1 /> */}
        {/* Spacer for logo scroll animation (Phase 1: 100vh + Phase 2: 60vh = 160vh) */}
        <div
          className="logo-animation-spacer"
          style={{
            height: "100vh",
            width: "100%",
            backgroundColor: "#fff",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <SectionSavvy />
        <Section7 />
        <Section8 />
        <Section9 />
        <Section10 />
        <ServiceOffer />
      </div>
      <Footer theme="dark" />
    </>
  );
};

export default HomePage;
