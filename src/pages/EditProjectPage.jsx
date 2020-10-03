import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProjectEditForm from "../components/ProjectEditForm/ProjectEditForm";

function EditProjectPage() {
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

  return <ProjectEditForm projectData={projectData} />;
}

export default EditProjectPage;
