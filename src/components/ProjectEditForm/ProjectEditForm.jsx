import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserPic from "../../components/UserPic/UserPic";


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
    <div id="pledgeform">
      <h2 id="headerTitle"> Edit or close your project: {credentials.title} </h2>
      <form>
        <div className="thra">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={credentials.title}
            onChange={handleChange}
          />
        </div>

        <div className="thra">
          <label htmlFor="description">Description:</label>
          <br></br>

          <textarea
            rows="5"
            type="textarea"
            id="description"
            value={credentials.description}
            onChange={handleChange}
          />
        </div>

        <div className="thra">
          <label htmlFor="campaign_end_date">Campaign End Date:</label>
          <input
            type="date"
            id="campaign_end_date"
            value={credentials.campaign_end_date}
            onChange={handleChange}
          />
        </div>
        <div className="thra">
          <label htmlFor="image">Image:</label>

          <div className="ownersection">
            <br></br>
            <div id="imagecon">
              <img id="profilepicture" src={credentials.image} alt="anon pic" />
            </div>
            <br></br>
          </div>
          <input
            type="url"
            id="image"
            value={credentials.image}
            onChange={handleChange}
          />
        </div>
        <div className="thra">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={credentials.city}
            onChange={handleChange}
          />
        </div>
        <div className="thra">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={credentials.location}
            onChange={handleChange}
          />
        </div>

        <div className="thra">
          <label htmlFor="is_open">Would you like to Close the Project?</label>

        </div>

        <div className="radiowrapper">
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

        <div className="thra">
          <label htmlFor="proj_cat">Category:</label>
          <br></br>
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
        <div className="buttonwrapper">

          <button className="pledgebutton" type="submit" onClick={handleSubmit}>
            Submit
      </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectEditForm;
