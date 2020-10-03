import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard/ProjectCard";

function HomePage() {
  //variables
  const [projectList, setProjectList] = useState([]);

  const [filter, setFilter] = useState("");

  //methods
  // run just
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
      });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div id="project-list">
      <input type="text" value={filter} onChange={handleFilter}></input>{" "}
      {projectList.reduce((total, projectData, key) => {
        if (
          filter != null &&
          filter !== "" &&
          !projectData.proj_cat.toLowerCase().includes(filter.toLowerCase())
        )
          return total;
        total.push(<ProjectCard key={key} projectData={projectData} />);
        return total;
      }, [])}
    </div>
  );
}

export default HomePage;
