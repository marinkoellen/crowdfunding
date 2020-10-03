import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../components/SideBar/SideBar.css";
import { Link } from "react-router-dom";

// import { oneProject } from "../data";
function formatDate(string) {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
}

function ProjectPage() {
  let username = "";
  const [loggedIn, setLoggedIn] = useState(false);

  const isAuthenticated = () => {
    let token = window.localStorage.getItem("token");

    if (token != null) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);

  const [projectData, setProjectData] = useState({ pledges: [] });
  const { id } = useParams();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectData(data);
      });
  }, [id]);

  if (loggedIn) {
    username = window.localStorage.getItem("username");
  }
  return (
    <div>
      <div>
        {loggedIn && (
          <Link to={`/pledge/${id}`}>
            <div>PLEDGE</div>
          </Link>
        )}
      </div>

      <h2>{projectData.title}</h2>
      <h3>{`Description:${projectData.description}`}</h3>
      <h3>Created at:{formatDate(projectData.date_created)}</h3>
      <h3>Closure Date:{formatDate(projectData.campaign_end_date)}</h3>
      <h3>{`Is project Open:${projectData.is_open}`}</h3>
      <h3>{`Goal:${projectData.goal}`}</h3>
      <h3>{`Dream Goal:${projectData.dream_goal}`}</h3>
      <h3>{`Owner:${projectData.owner}`}</h3>
      <h3>{`City:${projectData.city}`}</h3>
      <h3>{`Location:${projectData.location}`}</h3>
      <h3>{`Category:${projectData.proj_cat}`}</h3>
      <h3>{`Dream goal met:${projectData.dream_goal_met}`}</h3>
      <h3>{`Goal met:${projectData.goal_met}`}</h3>

      <img src={projectData.image} />

      <h3>Pledges:</h3>
      <ul>
        {projectData.pledges.map((pledgeData, key) => {
          console.log({ pledgeData });
          return (
            <li key={key}>
              {pledgeData.amount} from{" "}
              {pledgeData.anonymous ? "Annoymous" : pledgeData.supporter}
            </li>
          );
        })}
      </ul>
      <h3>{`Total Pledges:${projectData.total_pledges}`}</h3>

      <div>
        {loggedIn && username === projectData.owner && (
          <Link to={`/projects/edit/${id}`}>
            <div>Edit Project</div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ProjectPage;
