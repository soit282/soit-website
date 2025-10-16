import { useParams } from "react-router-dom";
import TraMadeWorkDetail from "@components/works/traMade-workDetail/TraMadeWorkDetail";
import DogmaWorkDetail from "@components/works/dogma-workDetail/DogmaWorkDetail";
import UnAvailableWorkDetail from "@components/works/unavailable-workDetail/UnAvailableWorkDetail";

const WorkDetailPage = () => {
  const { workId } = useParams();

  // Render specific work detail component based on workId
  const renderWorkDetail = () => {
    switch (workId) {
      case "tramade":
        return <TraMadeWorkDetail />;
      case "dogma":
        return <DogmaWorkDetail />;
      case "unavailable":
        return <UnAvailableWorkDetail />;
      default:
        return (
          <div style={{ padding: "100px 20px", textAlign: "center" }}>
            <h1 className="text-2_100pt_medium">Work Detail: {workId}</h1>
            <p
              className="text-4"
              style={{ marginTop: "20px", color: "#939393" }}
            >
              This work detail page is coming soon.
            </p>
          </div>
        );
    }
  };

  return <div className="work-detail-page">{renderWorkDetail()}</div>;
};

export default WorkDetailPage;
