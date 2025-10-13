import { useEffect, useRef } from "react";
import Section1 from "@components/home/section1/Section1";
import Section2 from "@components/home/section2/Section2";
import Section3 from "@components/home/section3/Section3";
import Section4 from "@components/home/section4/Section4";
import Section5 from "@components/home/section5/Section5";
import Section6 from "@components/home/section6/Section6";
import Section7 from "@components/home/section7/Section7";
import Section8 from "@components/home/section8/Section8";
import Section9 from "@components/home/section9/Section9";
import Section10 from "@components/home/section10/Section10";
import ServiceOffer from "@components/services/ServiceOffer";
import Footer from "@components/footer/Footer";
import Navbar from "@components/navbar/Navbar";
import SmoothScroll from "@/utils/smooth-scroll";

const HomePage = () => {
  const smoothScrollRef = useRef(null);

  useEffect(() => {
    // Initialize SmoothScroll
    smoothScrollRef.current = new SmoothScroll({
      ease: 0.075, // Adjust for smoother/faster scroll (0.05-0.1)
    });

    // Cleanup on unmount
    return () => {
      if (smoothScrollRef.current) {
        smoothScrollRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-page">
        {/* <Section1 /> */}
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
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
