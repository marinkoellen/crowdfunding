import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function ProfileEditForm(props) {
  const { ProfileData, PublicProfileData } = props;
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
    console.log(response);
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(credentials);
    if (credentials.username != null) {
      postData().then((response) => {
        console.log(response);
        history.push("/userprofile/");
      });
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="location">location:</label>
        <input
          type="text"
          id="location"
          value={credentials.userprofile.location}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="display_picture">display picture:</label>
        <input
          type="url"
          id="display_picture"
          value={credentials.userprofile.display_picture}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="city">city:</label>
        <input
          type="text"
          id="city"
          value={credentials.userprofile.city}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="username">username:</label>
        <textarea
          type="text"
          id="username"
          value={credentials.username}
          onChange={handleChangePrivate}
        />
      </div>

      <div>
        <label htmlFor="email">email:</label>
        <input
          type="text"
          id="email"
          value={credentials.email}
          onChange={handleChangePrivate}
        />
      </div>

      <div>
        <label htmlFor="preferred_name">preferred_name:</label>
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
  );
}

export default ProfileEditForm;
