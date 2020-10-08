import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "./ProjectCard.css";
import DateTag from "../../components/DateTag/DateTag";


function formatDate(string) {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(string).toLocaleDateString([], options);
}

function ProjectCard(props) {
  const { projectData } = props;
  const completed = Math.round(
    (projectData.total_pledges / projectData.goal) * 100
  );

  var current_date = formatDate(new Date());
  const diffInMs = (new Date(projectData.campaign_end_date) - new Date(current_date))
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24), 2);


  return (
    <div className="project-card" id={projectData.is_open === false ? "project-closed" : "project-open"}>
      <Link to={`/projects/${projectData.id}`}>
        <img src={projectData.image} />

        <div className="project-infosummary">
          <ProgressBar completed={completed} className="progress-bar" />
          <p id="amount" className="cat">${projectData.total_pledges} raised of ${projectData.goal} goal</p>
          <p className="cat">{projectData.title}</p>

          <p id="author" className="cat">By {projectData.owner.toUpperCase()}</p>


          {projectData.is_open && (<DateTag diffInDays={diffInDays} isOpen={projectData.is_open} />)}
          {!projectData.is_open && (
            <p id="author" className="cat">Project Closed by: {projectData.owner.toUpperCase()}</p>
          )}

        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
