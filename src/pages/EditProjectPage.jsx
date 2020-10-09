import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProjectEditForm from "../components/ProjectEditForm/ProjectEditForm";
import Loader from "../components/Loader/Loader";

function EditProjectPage() {
  let username = localStorage.username;

  const [projectData, setProjectData] = useState({ pledges: [] });
  const [isLoading, setisLoading] = useState(true);
  const [isAuthor, setisAuthor] = useState(false);

  const { id } = useParams();
  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectData(data);
        setisLoading(false);
        if (data.owner == username) {
          setisAuthor(true);
        }

      });
  }, [id]);

  return (
    <div id="projectlistcenter">
      {!isLoading && (
        <div id="pledgeform">

          {isAuthor &&
            <ProjectEditForm projectData={projectData} />
          }

          {!isAuthor &&
            <div id="errormessage">
              <br></br>
              <img className="backgroundimage" src="https://www.pngitem.com/pimgs/m/119-1190787_warning-alert-attention-search-error-icon-hd-png.png" />
              <h2 id="headerTitle">You are not the author of this project or are not logged in to complete this action if it is your project. </h2>
            </div>
          }

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

export default EditProjectPage;
