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
    <div id="projectlistcenter">
      {!isLoading && (
        <div>
          <h2 id="headerTitle"> {id.toUpperCase()}</h2>


          <div id="overallcontainer-public">
            {PublicProfileData != null && (
              <div className="publicpic">
                { PublicProfileData.display_picture != null && (<img id="profilepicture" src={PublicProfileData.display_picture} alt="anon pic" />)}
                {  PublicProfileData.display_picture == null && (<img id="profilepicture" src="https://icon-library.net/images/default-profile-icon/default-profile-icon-16.jpg" alt="anon pic" />)}
              </div>
            )}
            {PublicProfileData == null && (
              <div className="publicpic">
                <img id="profilepicture" src="https://icon-library.net/images/default-profile-icon/default-profile-icon-16.jpg" alt="anon pic" />
              </div>
            )}
            {PublicProfileData != null && (
              <div id="centerprofiletext">

                <h4 className="nopadding">Location:</h4>
                <p className="nopadding">{PublicProfileData.city}, {PublicProfileData.location}</p>

                {PublicProfileData.date_joined != null && (
                  <div>
                    <h4 className="nopadding" >Date Joined Nibble:</h4>
                    <p id="datemove" className="nopadding">{formatDate(PublicProfileData.date_joined).toUpperCase()}</p>
                  </div>
                )}
                {PublicProfileData.last_updated != null && (
                  <div>
                    <h4 className="nopadding" >Last Updated their profile:</h4>
                    <p id="datemove" className="nopadding">{formatDate(PublicProfileData.last_updated).toUpperCase()}</p>
                  </div>
                )}

                <h4 className="nopadding" >Number of pledges made: {(ProfileActivityData.count_pledged)}</h4>

              </div>
            )}
            {PublicProfileData == null && (
              <div>
                <h3 id="headerTitle">{id} does not have a public profile page set up yet!</h3>
              </div>
            )}
          </div>





          {projectList.length > 0 && (
            <div>

              <h2 id="headerTitle">
                {id.toUpperCase()} has {projectList.length} Active or Closed Projects
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
              <h2 id="headerTitle"> {id.toUpperCase()} has No Active or Completed Projects</h2>
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


