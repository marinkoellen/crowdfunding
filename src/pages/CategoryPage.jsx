import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import Loader from "../components/Loader/Loader";
import { useHistory, useParams } from "react-router-dom";

function CategoryPage() {
  //variables
  const { project_id } = useParams();

  const [projectList, setProjectList] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setisLoading] = useState(true);

  //methods
  // run just
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let output = data.filter((obj) => obj.proj_cat == project_id);
        setProjectList(output);
        setisLoading(false);
      });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div id="projectlistcenter">
      <div>
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
      </div>
      <div>
        {!isLoading && (
          <div>
            <h3 id="headerTitle">Nibble is a crowdfunding site that is created specifically with food in mind. <br></br> Browse our {projectList.length} current Nibble projects related to {project_id}s!</h3>

            <div id="search-bar__wrapper">
              <input id="search-bar"
                type="text"
                placeholder="Search ... for Project Title, Category, Location or Owner"
                value={filter}
                onChange={handleFilter}
              ></input>{" "}
            </div>
            <div id="project-list">
              {projectList.reduce((total, projectData, key) => {
                if (
                  filter != null &&
                  filter !== "" &&
                  !projectData.title
                    .toLowerCase()
                    .includes(filter.toLowerCase()) &&
                  !projectData.owner
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                )
                  return total;

                total.push(<ProjectCard key={key} projectData={projectData} />);
                return total;
              }, [])}
            </div>
          </div>
        )}
      </div>
    </div >
  );
}

export default CategoryPage;
