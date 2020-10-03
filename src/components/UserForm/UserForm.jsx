import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function UserForm() {
  //variables
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    preferred_name: "",
    password: "",
    userprofile: {},
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
    //function you can call but carry on as well
    const response = await fetch(`${process.env.REACT_APP_API_URL}users/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username != null) {
      console.log(credentials);

      postData().then((response) => {
        history.push("/login");
      });
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Username!"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="email?"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="preferred_name">Preferred Name:</label>
        <input
          type="text"
          id="preferred_name"
          placeholder="What is your preferred name?"
          onChange={handleChange}
        />
      </div>

      <button className="button" type="submit" onClick={handleSubmit}>
        Create User
      </button>
    </form>
  );
}

export default UserForm;
