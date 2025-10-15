import { projects } from "@data/projects";
import "./ListView.css";
import "@styles/grid-system.css";

export default function ListView() {
  return (
    <div className="list-view">
      <div className="grid-container">
        <div className="col-12">
          <div className="projects-table">
            {/* Header Row */}
            <div className="table-header-row">
              <div className="text-7 table-header table-col-client">Client</div>
              <div className="text-7 table-header table-col-category">
                Category
              </div>
              <div className="text-7 table-header table-col-type">Type</div>
              <div className="text-7 table-header table-col-year">Year</div>
              <div className="row-underline"></div>
            </div>

            {/* Project Rows */}
            {projects.map((project) => (
              <div key={project.id} className="project-row">
                <div className="text-8 project-name table-col-client">
                  {project.name}
                </div>
                <div className="text-8 project-category table-col-category">
                  {project.category}
                </div>
                <div className="text-8 project-type table-col-type">
                  {project.type}
                </div>
                <div className="text-8 project-year table-col-year">
                  {project.year}
                </div>
                <div className="row-underline"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
