import React, {useState, useEffect} from "react";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import Loader from "../components/Loader/Loader";
import {useHistory, useParams} from "react-router-dom";

function CategoryPage() {
  //variables
  const {project_id} = useParams();

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
    <div>
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
            <h1>{project_id} Projects</h1>
            <input
              type="text"
              placeholder="Search by Title or Project Owner"
              value={filter}
              onChange={handleFilter}
            ></input>{" "}
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
    </div>
  );
}

export default CategoryPage;
