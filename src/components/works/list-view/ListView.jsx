import { projects } from "@data/projects";
import "./ListView.css";

export default function ListView() {
  return (
    <div className="list-view">
      <table className="projects-table">
        <thead>
          <tr>
            <th className="text-8 table-header">Name</th>
            <th className="text-8 table-header">Category</th>
            <th className="text-8 table-header">Type</th>
            <th className="text-8 table-header">Year</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="project-row">
              <td className="text-7 project-name">{project.name}</td>
              <td className="text-8 project-category">{project.category}</td>
              <td className="text-8 project-type">{project.type}</td>
              <td className="text-8 project-year">{project.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
