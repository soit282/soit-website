import Section1Work from "@components/works/section1-work/Section1Work";
import Section2Work from "@components/works/section2-work/Section2Work";
import Section3Work from "@components/works/section3-work/Section3Work";
import Section4Work from "@components/works/section4-work/Section4Work";

const WorksPage = () => {
  return (
    <div className="works-page">
      <Section1Work />
      <Section2Work />
      <Section3Work />
      <Section4Work />
    </div>
  );
};

export default WorksPage;