import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ProjectForm.css";
import "../../components/ProjectCard/ProjectCard.css";

function ProjectForm() {
  const [categorylist, setCategorylist] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}categories/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setCategorylist(data);
      });
  }, []);
  console.log(categorylist);

  //variables
  const [credentials, setCredentials] = useState({
    title: "",
    goal: "",
    description: "",
    dream_goal: "",
    campaign_end_date: "",
    image: "",
    is_open: "",
    city: "",
    location: "",
    proj_cat: "",
  });

  //methods
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const history = useHistory();

  const postData = async () => {
    let token = window.localStorage.getItem("token");

    //function you can call but carry on as well
    const response = await fetch(`${process.env.REACT_APP_API_URL}projects/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.title != null) {
      console.log(credentials);

      postData().then((response) => {
        console.log(response);
        history.push("/");
      });
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          id="title"
          placeholder="What is the title of your crowd funding project?"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          type="textarea"
          id="description"
          placeholder="Give us a taste of what's to come to get your project sponsored!"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          type="number"
          id="goal"
          placeholder="What is the goal of your crowd funding project?"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dream_goal">Dream Goal:</label>
        <input
          type="number"
          id="dream_goal"
          placeholder="What is the dream_goal of your crowd funding project?"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="campaign_end_date">campaign end date:</label>
        <input
          type="date"
          id="campaign_end_date"
          placeholder="When does your crowd funding project clsoe?"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">image:</label>
        <input
          type="url"
          id="image"
          placeholder="What is the image of your crowd funding project?"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="city">city:</label>
        <input
          type="text"
          id="city"
          placeholder="What is the city of your crowd funding project?"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="location">location:</label>
        <input
          type="text"
          id="location"
          placeholder="What is the location of your crowd funding project?"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="is_open">Is this project open on submission:</label>
        <input
          type="radio"
          id="is_open"
          name="is_open"
          value="true"
          onChange={handleChange}
        />
        <label htmlFor="is_open">Open</label>
        <input
          type="radio"
          id="is_open"
          name="is_open"
          value="false"
          onChange={handleChange}
        />
        <label htmlFor="false">Closed</label>
      </div>

      <div>
        <label htmlFor="proj_cat">Category:</label>
        <select
          type="select"
          id="proj_cat"
          placeholder="category"
          onChange={handleChange}
        >
          {categorylist.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button className="button" type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default ProjectForm;