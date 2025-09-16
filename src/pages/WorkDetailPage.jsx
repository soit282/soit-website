import { useParams } from "react-router-dom";

const WorkDetailPage = () => {
  const { workId } = useParams();

  return (
    <div className="work-detail-page">
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1 className="text-2_100pt_medium">Work Detail: {workId}</h1>
        <p className="text-4" style={{ marginTop: '20px', color: '#939393' }}>
          This is the detail page for {workId}
        </p>
      </div>
    </div>
  );
};

export default WorkDetailPage;