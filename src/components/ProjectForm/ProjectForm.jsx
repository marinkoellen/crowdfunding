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
    <div id="pledgeform">
      <h2 id="headerTitle"> Create a new project and be on your way to achieving your food dreams! </h2>

      <form>
        <div className="thra">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="What is the title of your crowd funding project?"
            onChange={handleChange}
            required
          />
        </div>

        <div className="thra">
          <label htmlFor="description">Description:</label>
          <textarea
            type="textarea"
            id="description"
            placeholder="Give us a taste of what's to come to get your project sponsored!"
            onChange={handleChange}
          />
        </div>

        <div className="thra">
          <label htmlFor="goal">Goal:</label>
          <input
            type="number"
            id="goal"
            placeholder="What is the minimum amount required to fund your project?"
            onChange={handleChange}
          />
        </div>
        <div className="thra">
          <label htmlFor="dream_goal">Dream Goal:</label>
          <input
            type="number"
            id="dream_goal"
            placeholder="What is your dream amount of money to make this a success?"
            onChange={handleChange}
          />
        </div>
        <div className="thra">
          <label htmlFor="campaign_end_date">Campaign End Date:</label>
          <input
            type="date"
            id="campaign_end_date"
            placeholder="When does your crowd funding project clsoe?"
            onChange={handleChange}
          />
        </div>
        <div className="thra">
          <label htmlFor="image">Project Image:</label>
          <input
            type="url"
            id="image"
            placeholder="What is the image of your crowd funding project?"
            onChange={handleChange}
          />
        </div>
        <div className="thra">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            placeholder="What is the city of your crowd funding project?"
            onChange={handleChange}
          />
        </div>
        <div className="thra">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            placeholder="What is the location of your crowd funding project?"
            onChange={handleChange}
          />
        </div>

        <div className="thra">
          <label htmlFor="is_open">Is this Project Open on submission of this form?:</label>
        </div>
        <div className="radiowrapper">
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

        <div className="thra">
          <label htmlFor="proj_cat">What Category does your Nibble project fall under?:</label>
          <br></br>
          <select type="select" id="proj_cat" onChange={handleChange}>
            {categorylist.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

        </div>
        <div className="buttonwrapper">
          <button className="pledgebutton" type="submit" onClick={handleSubmit}>
            Submit your Nibble project!
      </button>
          <br></br>
          <br></br>

        </div>
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
