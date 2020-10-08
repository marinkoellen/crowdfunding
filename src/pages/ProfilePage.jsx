import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../components/SideBar/SideBar.css";
import { Link } from "react-router-dom";
import DeleteProfile from "../components/DeleteProfile/DeleteProfile";
import Loader from "../components/Loader/Loader";
import ProjectCard from "../components/ProjectCard/ProjectCard";


// import { oneProject } from "../data";
function formatDate(string) {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
}

function ProfilePage() {
  let username = localStorage.username;
  let token = localStorage.token;
  const [ProfileData, setProfileData] = useState({});
  const [PublicProfileData, setPublicProfileData] = useState({});
  const [ProfileActivityData, setProfileActivity] = useState({ owner_projects: [], supporter_pledges: [] });

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${username}/`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((results) => {
        console.log(results);
        return results.json();
      })
      .then((data) => {
        setProfileData(data);
        setPublicProfileData(data.userprofile);
        setisLoading(false);
      });
  }, [username]);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${username}/Activity/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProfileActivity(data);
        console.log("activity", data)
      });
  }, [username]);

  return (
    <div>
      {!isLoading && (
        <div>
          <h1> Hello {ProfileData.preferred_name}!</h1>
          <h2>Account Details</h2>
          <h3>Username: {ProfileData.username}</h3>
          <h3>Email: {ProfileData.email}</h3>
          <h3>Preferred Name:{ProfileData.preferred_name}</h3>
          <h2>Profile Details</h2>

          {PublicProfileData.last_updated != null && (
            <h3>Last Updated: {formatDate(PublicProfileData.last_updated)}</h3>
          )}
          <h3>City: {PublicProfileData.city}</h3>
          {PublicProfileData.date_joined != null && (
            <h3>Date Joined: {formatDate(PublicProfileData.date_joined)}</h3>
          )}
          <h3>Display Picture {PublicProfileData.display_picture}</h3>


          {ProfileActivityData.supporter_pledges.length > 0 && <div>
            <h3>Pledges:</h3>
            <ul>
              {ProfileActivityData.supporter_pledges.map((pledgeData, key) => {
                console.log({ pledgeData });
                return (
                  <li key={key}>
                    ${pledgeData.amount} for project: <Link to={`/projects/${pledgeData.project_id}`}>
                      {pledgeData.project_id}
                    </Link>
                    {" "}
                    {pledgeData.anonymous ? (
                      "- Please note, you pledged anonymously!"
                    ) : ""}
                  </li>
                );
              })}
            </ul>
          </div>
          }

          {ProfileActivityData.supporter_pledges.length == 0 && <div>
            <h3>You have not made any pledges yet:</h3>
            <h3>Browse our existing projects <Link to={`/projects/`}> Here! </Link></h3>

          </div>
          }


          {ProfileActivityData.owner_projects.length > 0 && (
            <div>
              <h2>See how your {ProfileActivityData.owner_projects.length} Active Projects are progressing or view your completed Projectes:</h2>
              <h2>Active Projects:</h2>
              <div id="project-list">
                {ProfileActivityData.owner_projects.map((projectData, key) => {
                  if (projectData.is_open == true) {
                    return <ProjectCard key={key} projectData={projectData} />
                  }
                })}
              </div>
              <h2>Closed Projects:</h2>
              <div id="project-list">
                {ProfileActivityData.owner_projects.map((projectData, key) => {
                  if (projectData.is_open != true) {
                    return <ProjectCard key={key} projectData={projectData} />
                  }
                })}
              </div>
            </div>
          )}

          {ProfileActivityData.owner_projects.length == 0 && (
            <div>
              <h2>You have no Active or Completed Projects!</h2>
            </div>
          )}



          <Link to={`/edit-userprofile/`}>
            <div>Update Profile & Account Details</div>
          </Link>

          <DeleteProfile />
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

export default ProfilePage;
