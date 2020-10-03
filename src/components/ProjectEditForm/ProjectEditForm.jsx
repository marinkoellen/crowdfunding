import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function ProjectEditForm(props) {
  const { projectData } = props;

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
    radio_Checked_open: "",
    radio_Checked_closed: "",
  });
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

  let date_convert = "";

  useEffect(() => {
    if (projectData.campaign_end_date != null) {
      date_convert = projectData.campaign_end_date;
      date_convert = date_convert.substring(0, 10);
    }

    setCredentials({
      title: projectData.title,
      goal: projectData.goal,
      description: projectData.description,
      dream_goal: projectData.dream_goal,
      campaign_end_date: date_convert,
      image: projectData.image,
      is_open: projectData.is_open,
      city: projectData.city,
      location: projectData.location,
      proj_cat: projectData.proj_cat,
    });
  }, [projectData]);

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
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}projects/${projectData.id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(credentials),
      }
    );
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
          value={credentials.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          type="textarea"
          id="description"
          value={credentials.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          type="number"
          id="goal"
          value={credentials.goal}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dream_goal">Dream Goal:</label>
        <input
          type="number"
          id="dream_goal"
          value={credentials.dream_goal}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="campaign_end_date">campaign end date:</label>
        <input
          type="date"
          id="campaign_end_date"
          value={credentials.campaign_end_date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">image:</label>
        <input
          type="url"
          id="image"
          value={credentials.image}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="city">city:</label>
        <input
          type="text"
          id="city"
          value={credentials.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="location">location:</label>
        <input
          type="text"
          id="location"
          value={credentials.location}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="is_open">Please confirm project is still open:</label>
        <input
          type="radio"
          id="is_open"
          name="is_open"
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
          onChange={handleChange}
          value={credentials.proj_cat}
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

export default ProjectEditForm;
