import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ProjectForm.css";
import "../../components/ProjectCard/ProjectCard.css";

function ProjectForm() {
  const [categorylist, setCategorylist] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}categories/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setCategorylist(data);
      });
  }, []);

  //variables
  const [credentials, setCredentials] = useState({
    title: "",
    goal: "",
    description: "",
    dream_goal: "",
    campaign_end_date: "",
    image: "",
    is_open: true,
    city: "",
    location: "",
    proj_cat: "Restaurant",
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

    if (response.ok) {
      return response.json();
    } else {
      response.text().then(text => {
        throw Error(text)
      }).catch(
        (error) => {
          const errorObj = JSON.parse(error.message);
          console.log(errorObj)
          setError(errorObj);
        }
      )
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postData().then((response) => {
      if (response != undefined) {
        history.push("/")
      } else {
        history.push("/project-create")
      }
    }).catch(
      (error) => {
        console.log("error")
      }
    )

  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            id="title"
            placeholder="What is the title of your crowd funding project?"
            onChange={handleChange}
            required
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
          <select type="select" id="proj_cat" onChange={handleChange}>
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
      {
        error && (
          <div>
            {
              Object.keys(error).map((key, index) => (
                <p key={index}> Error for: {key} -  {error[key]}</p>
              ))
            }
          </div>
        )
      }
    </div >
  );
}

export default ProjectForm;
