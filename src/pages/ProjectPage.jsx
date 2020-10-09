import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../components/SideBar/SideBar.css";
import { Link } from "react-router-dom";
import DeleteProject from "../components/DeleteProject/DeleteProject";
import Loader from "../components/Loader/Loader";
import "./TestPage.css";
import PledgeForm from "../components/PledgeForm/PledgeForm";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import location from '../icons/location.png';
import clock from '../icons/clock.png';
import UserPic from "../components/UserPic/UserPic";

// import { oneProject } from "../data";
function formatDate(string) {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
}

function ProjectPage() {
  const history = useHistory();

  let username = "";
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [modalState, setModalState] = useState(false);
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState(false);


  const toggleModalState = () => {
    setModalState(!modalState);
  };

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
  const [pledgeData, setPledgeData] = useState([]);

  const { id } = useParams();

  const fetchProjects = async () => {
    let response
    try {
      response = await fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
    } catch (error) {
      setisLoading(false);
      setErrorMessage(true);
      setError(data);
      return
    }

    const data = await response.json();

    if (response.ok) {
      setProjectData(data);
      setPledgeData(data.pledges.slice(Math.max(data.pledges.length - 4, 0)));
      setisLoading(false);

    } else {
      setisLoading(false);
      setError(data);
      setErrorMessage(true);
    }

  }

  useEffect(() => {
    fetchProjects()

  }, [id]);

  const handleDelete = (e) => {
    let token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_API_URL}projects/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then(() => {
      history.push("/")
    });
  }
  username = window.localStorage.getItem("username");



  return (
    <div id="projectlistcenter">

      {!isLoading && errorMessage && (<div>

        <div id="errormessage">
          <br></br>
          <img className="backgroundimage" src="https://www.pngitem.com/pimgs/m/119-1190787_warning-alert-attention-search-error-icon-hd-png.png" />
          <h2>There is no project with ID {id} </h2>
        </div>
      </div>)}


      {!isLoading && !errorMessage && (
        <div>

          <div className="App">
            <h2>{projectData.title}</h2>
            {!projectData.is_open && (
              <div id="errordiv">
                <h4>This project is CLOSED and not accepting new pledges</h4>
              </div>
            )}

            <p>{projectData.description}</p>

            <div className="pledgeseperatedfromotherinfo" >

              <div className="PROJECTINFO">
                <div className="Image-container"><img src={projectData.image} />   </div>
                <div className="backgroundinfo">
                  <div className="backgroundsection">
                    <p>Located at:</p>
                    <img className="backgroundimage" src={location} />
                    <p>{projectData.city},{projectData.location}</p>
                  </div>
                  <div className="backgroundsection">
                    <p>Closes on:</p>
                    <img className="backgroundimage" src={clock} />
                    <p>{formatDate(projectData.campaign_end_date)}</p>
                  </div>
                  <div className="backgroundsection">
                    <p>Project Category:</p>

                    <img className="backgroundimage" src="https://www.flaticon.com/svg/static/icons/svg/857/857681.svg" />
                    <p>{projectData.proj_cat}</p>
                  </div>


                </div>
              </div>

              <div className="Pledge-Information">
                <div>
                  {loggedIn && projectData.is_open && (
                    <button className="pledgebutton" onClick={() => toggleModalState()}>PLEDGE</button>
                  )}
                </div>
                <h4>Supported By:</h4>
                <ProgressBar completed={Math.round(
                  (projectData.total_pledges / projectData.goal) * 100
                )} className="progress-bar" />
                <p id="amount" className="cat">${projectData.total_pledges} raised of ${projectData.goal} goal</p>
                <h4>Recent Pledges:</h4>
                {pledgeData.length > 0 && (<ul>
                  {pledgeData.map((pledgeData, key) => {
                    console.log({ pledgeData });
                    return (
                      <li key={key}>
                        ${pledgeData.amount} from{" "}
                        {pledgeData.anonymous ? (
                          "an annoymous donor"
                        ) : (
                            <Link className="comment" to={`/userprofile/${pledgeData.supporter}`}>
                              {pledgeData.supporter.toUpperCase()}
                            </Link>
                          )}
                        <p className="comment">{pledgeData.comment}</p>
                      </li>
                    );
                  })}
                </ul>)}

                {pledgeData.length == 0 && (<p>No pledges yet</p>)}

                <div className="ownersection">
                  <h4>Project created by:</h4>
                  <UserPic username={projectData.owner} />

                  <Link className="comment" to={`/userprofile/${projectData.owner}`}>
                    <p>{projectData.owner}</p>
                  </Link>
                </div>
              </div>


            </div>



            <div >
              {loggedIn && username === projectData.owner && (
                <div className="editproject">
                  <Link to={`/projects/edit/${id}`}>
                    <button className="editbutton">Edit Project</button>
                  </Link>
                  <button className="editbutton" type="submit" onClick={handleDelete}>Delete Project</button>
                </div>
              )}


            </div>


            <div className={`modalBackground modalShowing-${modalState}`}>
              <div className="modalInner">
                <div className="modalImage">

                </div>
                <div className="modalText">
                  <PledgeForm id={id} title={projectData.title} />
                  <div>
                    <button className="exitButton" onClick={() => toggleModalState()}> exit </button>
                  </div>
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

  )
}

export default ProjectPage;
