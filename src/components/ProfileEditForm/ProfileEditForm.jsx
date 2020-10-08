import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function ProfileEditForm(props) {
  const { ProfileData, PublicProfileData } = props;
  const [error, setError] = useState();

  //variables
  const [credentials, setCredentials] = useState({
    username: "",
    preferred_name: "",
    email: "",
    userprofile: {
      display_picture: "",
      location: "",
      city: "",
    },
  });


  useEffect(() => {
    setCredentials({
      username: ProfileData.username,
      preferred_name: ProfileData.preferred_name,
      email: ProfileData.email,
      userprofile: {
        display_picture:
          PublicProfileData.display_picture != null
            ? PublicProfileData.display_picture
            : "",
        location:
          PublicProfileData.location != null ? PublicProfileData.location : "",
        city: PublicProfileData.city != null ? PublicProfileData.city : "",
      },
    });
  }, [ProfileData]);

  //methods
  const handleChangePrivate = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      userprofile: { ...prevCredentials.userprofile, [id]: value },
    }));
    console.log(credentials);
  };

  const history = useHistory();
  const postData = async () => {
    let username = localStorage.username;
    let token = localStorage.token;

    //function you can call but carry on as well
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${username}/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(credentials),
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      response.text().then(text => {
        throw Error(text)
      }).catch(
        (error) => {
          const errorObj = JSON.parse(error.message);
          setError(errorObj);
        }
      )
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData()
      .then((response) => {
        if (response != undefined) {
          history.push("/userprofile/");
        } else {
          history.push("/edit-userprofile")
        }
      }).catch(
        (error) => {
          console.log("error")
        }
      )

  };



  return (
    <div id="pledgeform">
      <h2 id="headerTitle"> Update your Account Details Here</h2>

      <form>
        <div className="thra">

          <label htmlFor="location">Your Current Location:</label>
        </div>

        <div className="thra">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={credentials.userprofile.city}
            onChange={handleChange}
          />
        </div>
        <div className="thra">

          <label htmlFor="location">State:</label>
          <input
            type="text"
            id="location"
            value={credentials.userprofile.location}
            onChange={handleChange}
          />
        </div>





        <div className="thra">
          <label htmlFor="display_picture">Display picture (URL):</label>

          <div className="ownersection">
            <br></br>
            <div id="imagecon">
              {credentials.userprofile.display_picture == "" && (<div></div>)}
              {credentials.userprofile.display_picture != "" && (<img id="profilepicture" src={credentials.userprofile.display_picture} alt="anon pic" />
              )}

            </div>
            <br></br>
          </div>
          <input
            type="url"
            id="display_picture"
            value={credentials.userprofile.display_picture}
            onChange={handleChange}
          />
        </div>


        <div className="thra">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={credentials.username}
            onChange={handleChangePrivate}
          />
        </div>

        <div className="thra">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={credentials.email}
            onChange={handleChangePrivate}
          />
        </div>

        <div className="thra">
          <label htmlFor="preferred_name">Preferred Name:</label>
          <input
            type="text"
            id="preferred_name"
            value={credentials.preferred_name}
            onChange={handleChangePrivate}
          />
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
    </div>
  );
}

export default ProfileEditForm;
