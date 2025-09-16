import Section1Work from "@components/works/section1-work/Section1Work";
import Section2Work from "@components/works/section2-work/Section2Work";
import Section3Work from "@components/works/section3-work/Section3Work";
import Section4Work from "@components/works/section4-work/Section4Work";
import Section5Work from "@components/works/section5-work/Section5Work";
import Section6Work from "@components/works/section6-work/Section6Work";
import Section7Work from "@components/works/section7-work/Section7Work";
import Section8Work from "@components/works/section8-work/Section8Work";

const WorksPage = () => {
  return (
    <div className="works-page">
      <Section1Work />
      <Section2Work />
      <Section3Work />
      <Section4Work />
      <Section5Work />
      <Section6Work />
      <Section7Work />
      <Section8Work />
    </div>
  );
};

export default WorksPage;