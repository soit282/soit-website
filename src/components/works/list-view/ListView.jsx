import { useEffect } from "react";
import { projects } from "@data/projects";
import "./ListView.css";
import "@styles/grid-system.css";

export default function ListView() {
  // Hover effects for project rows
  useEffect(() => {
    const projectRows = document.querySelectorAll(".projects-table .project-row");

    projectRows.forEach((row) => {
      let animationTimeout;
      let resetTimeout;
      let isHovering = false;
      let isOnRepeat = false;

      function startAnimation() {
        // Clear any existing timeouts
        clearTimeout(animationTimeout);
        clearTimeout(resetTimeout);

        // Remove previous states and start animation
        if (!isOnRepeat) {
          row.classList.remove("locked");
          row.classList.remove("reset");
          row.classList.add("animate");
        }

        // After animation completes
        animationTimeout = setTimeout(() => {
          row.classList.remove("animate");
          row.classList.add("locked");
          // After being locked for a moment
          resetTimeout = setTimeout(() => {
            // If still hovering, do nothing
            if (isHovering) {
              isOnRepeat = true;
            } else {
              // Otherwise reset to white
              row.classList.remove("locked");
              row.classList.add("reset");
              isOnRepeat = false;
            }
          }, 250);
        }, 500);
      }

      row.addEventListener("mouseenter", () => {
        isHovering = true;
        startAnimation();
      });

      row.addEventListener("mouseleave", () => {
        isHovering = false;
        isOnRepeat = false;
        row.classList.remove("locked");
        row.classList.add("reset");
        // Animation will complete and then reset to white
        // based on the isHovering flag in the timeout function
      });
    });
  }, []);

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
