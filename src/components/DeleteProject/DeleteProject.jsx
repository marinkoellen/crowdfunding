import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function DeleteProject(props) {
  const { projectID } = props;
  const history = useHistory();

  const [project, setProject] = useState({
    projectid: "",
  });

  useEffect(() => {
    setProject({
      projectid: projectID,
    });
  }, [projectID]);

  const handleSubmit = (e) => {
    let token = localStorage.getItem("token");
    console.log("here", project.projectid)
    fetch(`${process.env.REACT_APP_API_URL}projects/${project.projectid}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },

    }
    );

  };

  return (
    <button className="exitbutton" type="submit" onClick={handleSubmit}>Delete your project</button>
  );
}

export default DeleteProject;
