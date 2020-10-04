import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProjectEditForm from "../components/ProjectEditForm/ProjectEditForm";
import Loader from "../components/Loader/Loader";

function EditProjectPage() {
  const [projectData, setProjectData] = useState({ pledges: [] });
  const [isLoading, setisLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectData(data);
        setisLoading(false);
      });
  }, [id]);

  return (
    <div>
      {!isLoading && (
        <div>
          <ProjectEditForm projectData={projectData} />{" "}
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
