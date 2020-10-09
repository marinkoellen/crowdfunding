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
    <div>
      {!isLoading && (
        <div id="pledgeform">

          {isAuthor &&
            <ProjectEditForm projectData={projectData} />
          }

          {!isAuthor &&
            <h2>You are not the author of this project. </h2>
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
