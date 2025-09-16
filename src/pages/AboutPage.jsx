import ServiceOffer from "@components/services/ServiceOffer";
import Section1About from "@components/about/section1-about/Section1About";
import Section2About from "@components/about/section2-about/Section2About";
import Section3About from "@components/about/section3-about/Section3About";
import Section4About from "@components/about/section4-about/Section4About";
import Section5About from "@components/about/section5-about/Section5About";
import Section10 from "@components/home/section10/Section10";

const AboutPage = () => {
  return (
    <div className="about-page">
      <Section1About />
      <Section2About />
      <Section3About />
      <Section4About />
      <Section5About />
      <Section10 />
      <ServiceOffer />
    </div>
  );
};

export default AboutPage;
