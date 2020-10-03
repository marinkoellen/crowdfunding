import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import "./ProjectCard.css";
import DateTag from "../../components/DateTag/DateTag";

function ProjectCard(props) {
  const { projectData } = props;
  const completed = Math.round(
    (projectData.total_pledges / projectData.goal) * 100
  );
  const open = projectData.is_open;

  return (
    <div className="project-card">
      <Link to={`/projects/${projectData.id}`}>
        <img src={projectData.image} />

        <div className="project-infosummary">
          <ProgressBar completed={completed} className="progress-bar" />
          <p className="cat">{projectData.title}</p>

          <p className="cat">{projectData.owner}</p>

          {/* <p className="cat">{projectData.proj_cat}</p> */}
          <DateTag date={projectData.campaign_end_date} />
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
