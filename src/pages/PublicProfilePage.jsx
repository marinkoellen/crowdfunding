import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../components/SideBar/SideBar.css";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import Loader from "../components/Loader/Loader";

// import { oneProject } from "../data";
function formatDate(string) {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
}

function PublicProfilePage() {
  const { id } = useParams();
  const [PublicProfileData, setPublicProfileData] = useState({});
  const [ProfileActivityData, setProfileActivity] = useState({});
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${id}/Activity/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProfileActivity(data);
        setPublicProfileData(data.userprofile);
        setisLoading(false);
      });
  }, [id]);

  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let output = data.filter((obj) => obj.owner == id);
        console.log(output);
        setProjectList(output);
      });
  }, []);

  return (
    <div>
      {!isLoading && (
        <div>
          <h1>Profile: {id}</h1>

          {PublicProfileData != null && (
            <div>
              {PublicProfileData.last_updated != null && (
                <h2>
                  Last Updated their profile:{" "}
                  {formatDate(PublicProfileData.last_updated)}
                </h2>
              )}
              <h2>City: {PublicProfileData.city}</h2>
              {PublicProfileData.date_joined != null && (
                <h2>
                  Date Joined Nibble:{" "}
                  {formatDate(PublicProfileData.date_joined)}
                </h2>
              )}
              <img src={PublicProfileData.display_picture} />
            </div>
          )}

          {PublicProfileData == null && (
            <div>
              <h2>{id} does not have a public profile page set up yet!</h2>
            </div>
          )}

          <h2>Number of pledges: {ProfileActivityData.count_pledged}</h2>

          <h2>Active Projects:</h2>

          {projectList.length > 0 && (
            <div>
              <h2>
                {id} has {projectList.length} Active or Completed Projects:
              </h2>
              <div id="project-list">
                {projectList.map((projectData, key) => {
                  return <ProjectCard key={key} projectData={projectData} />;
                })}
              </div>
            </div>
          )}

          {projectList.length == 0 && (
            <div>
              <h2>{id} has No Active or Completed Project.</h2>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default PublicProfilePage;
