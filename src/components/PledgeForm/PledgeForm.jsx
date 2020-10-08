import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./PledgeForm.css";

function PledgeForm(props) {
  const { id, title } = props;

  //variables
  const [credentials, setCredentials] = useState({
    amount: "",
    comment: "",
    anonymous: "",
    project_id: id,
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
    const response = await fetch(`${process.env.REACT_APP_API_URL}pledges/`, {
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
    if (credentials.amount != null) {
      console.log(credentials);

      postData().then((response) => {
        history.push(`/projects/${id}`);
        window.location.reload();
      });
    }
  };

  return (
    <div id="pledgeform">
      <h2 id="headerTitle"> Pledge to {title} </h2>
      <form>
        <div className="thra">
          <label htmlFor="comment">Please leave a message with your pledge:</label>
          <input
            type="text"
            id="comment"
            required
            onChange={handleChange}
          />
        </div>

        <div className="thra">
          <label htmlFor="amount">How much would you like to pledge?:</label>
          <input type="number" id="amount" required min="0" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="anonymous">Do you wish for the pledge to remain Anonymous:</label>
          <input
            type="radio"
            id="anonymous"
            name="anonymous"
            value="true"
            required
            onChange={handleChange}
          />
          <label htmlFor="anonymous">Yes</label>
          <input
            type="radio"
            id="anonymous"
            name="anonymous"
            value="false"
            required
            onChange={handleChange}
          />
          <label htmlFor="false">No</label>
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

export default PledgeForm;
