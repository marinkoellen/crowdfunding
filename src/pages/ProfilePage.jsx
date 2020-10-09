import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../components/SideBar/SideBar.css";
import { Link } from "react-router-dom";
import DeleteProfile from "../components/DeleteProfile/DeleteProfile";
import Loader from "../components/Loader/Loader";
import ProjectCard from "../components/ProjectCard/ProjectCard";

import UserPic from "../components/UserPic/UserPic";

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
  const [modalState, setModalState] = useState(false);
  const [showPledge, setshowPledge] = useState(false);

  const [isLoading, setisLoading] = useState(true);

  const toggleModalState = () => {
    window.scrollTo(0, 0)
    setModalState(!modalState);
  };

  const togglePledge = () => {
    window.scrollTo(0, 0)
    setshowPledge(!showPledge);
  };

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
    <div id="projectlistcenter">


      {
        !isLoading && ProfileData.userprofile == null && (
          <div id="errormessage">
            <br></br>
            <img className="backgroundimage" src="https://www.pngitem.com/pimgs/m/119-1190787_warning-alert-attention-search-error-icon-hd-png.png" />
            <h2>There is no user profile set up for an admin user  </h2>
          </div>
        )
      }

      {!isLoading && ProfileData.userprofile != null && (
        <div>

          <div className="App">

            <div className="ownerid">
              <h2> Hello {ProfileData.preferred_name}!</h2>
            </div>


            <h3 className="nopadding"> Account Details</h3>

            <div className="editprofile">
              <button className="pledgeshow" onClick={() => togglePledge()}>See all current pledges you have made to Nibble Projects!</button>
            </div>
            <div className="profileseperatedfromotherinfo" >

              <div className="PROFILEINFO">
                <h4 className="nopadding" >Username:</h4>
                <p className="nopadding">{ProfileData.username.toUpperCase()}</p>
                <h4 className="nopadding" >Email:</h4>
                <p className="nopadding">{ProfileData.email.toUpperCase()}</p>
                <h4 className="nopadding" >Preferred Name:</h4>

                <p className="nopadding" >{ProfileData.preferred_name.toUpperCase()}</p>

                <h4 className="nopadding">Location:</h4>
                <p className="nopadding">{PublicProfileData.city}, {PublicProfileData.location}</p>
              </div>

              <div className="PP-Information">

                <br></br>

                <div id="enlargepic" >
                  {PublicProfileData != null && (

                    <div id="enlargepic">
                      { PublicProfileData.display_picture != null && (<img id="profilepicture" src={PublicProfileData.display_picture} alt="anon pic" />)}

                      {  PublicProfileData.display_picture == null && (<img id="profilepicture" src="https://icon-library.net/images/default-profile-icon/default-profile-icon-16.jpg" alt="anon pic" />)}
                    </div>
                  )}

                  {PublicProfileData == null && (
                    <div id="enlargepic">
                      <img id="profilepicture" src="https://icon-library.net/images/default-profile-icon/default-profile-icon-16.jpg" alt="anon pic" />
                    </div>
                  )}

                </div>

                <h4 className="nopadding" >Last Updated Public Profile: </h4>

                {PublicProfileData.last_updated != null && (
                  <p className="nopadding"> {formatDate(PublicProfileData.last_updated).toUpperCase()}</p>
                )}

                {PublicProfileData.last_updated == null && (
                  <p className="nopadding"> Have not edited your public profile since sign up!</p>
                )}
                <h4 className="nopadding" >See your current public profile:</h4>
                <Link to={`/userprofile/${username}`}>
                  <p className="nopadding">{username.toUpperCase()}</p>
                </Link>

              </div>


            </div>

            <div className="editprofile">

              <Link to={`/edit-userprofile/`}>
                <button className="editbutton"> Update Profile & Account </button>
              </Link>
              <button className="editbutton" onClick={() => toggleModalState()}>Delete Profile</button>

            </div>



            {ProfileActivityData.owner_projects.length > 0 && (
              <div>
                <h4>See how your {ProfileActivityData.owner_projects.length} Active Projects are progressing or view your closed Projectes:</h4>
                <h4>Active Projects:</h4>
                <div id="project-list">
                  {ProfileActivityData.owner_projects.map((projectData, key) => {
                    if (projectData.is_open == true) {
                      return <ProjectCard key={key} projectData={projectData} />
                    }
                  })}
                </div>
                <h4>Closed Projects:</h4>
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








            <div className={`modalBackground modalShowing-${modalState}`}>
              <div className="modalInner">
                <div className="modalImage">

                </div>
                <div className="modalText">

                  <h4 className="nopadding" >Are you sure you want to delete your user account?</h4>
                  <h4 className="nopadding" >All existing pledges and projects attributed to your profile will be immediately deleted</h4>
                  <div className="buttonwrapper">
                    <DeleteProfile />

                    <button className="exitButton" onClick={() => toggleModalState()}> No I don't want to delete my profile! </button>
                  </div>
                </div>
              </div>
            </div>


            <div className={`modalBackground modalShowing-${showPledge}`}>
              <div className="modalInner">
                <div className="modalText">

                  {ProfileActivityData.supporter_pledges.length > 0 && <div>

                    <h3 id="headerTitle">You have made {ProfileActivityData.supporter_pledges.length} pledges to Nibble Projects!</h3>
                    <div className="pledgescroll">
                      <ul>
                        {ProfileActivityData.supporter_pledges.map((pledgeData, key) => {
                          console.log({ pledgeData });
                          return (
                            <div >
                              <li key={key}>
                                ${pledgeData.amount} for project: <Link to={`/projects/${pledgeData.project_id}`}>
                                  {pledgeData.project_id}
                                </Link>
                                {" "}
                                {pledgeData.anonymous ? (
                                  "- Please note, you pledged anonymously!"
                                ) : ""}
                              </li>
                              <p className="comment">{pledgeData.comment}</p>
                            </div>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="buttonwrapper">
                      <button className="exitButton" onClick={() => togglePledge()}> Exit </button>
                    </div>
                  </div>
                  }

                  {ProfileActivityData.supporter_pledges.length == 0 && <div>
                    <h3 id="headerTitle">You have not made any pledges yet:</h3>
                    <h3 id="headerTitle">Browse our existing Nibble projects <Link to={`/projects/`}> Here! </Link></h3>
                    <div className="buttonwrapper">
                      <button className="exitButton" onClick={() => togglePledge()}> Exit </button>
                    </div>

                  </div>
                  }
                </div>
              </div>
            </div>


          </div>



        </div>
      )
      }



      <div>
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
      </div>
    </div >

  );


}

export default ProfilePage;
