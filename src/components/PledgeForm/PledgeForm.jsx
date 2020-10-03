import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function PledgeForm(props) {
  const { id } = props;

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
        console.log(response);
        history.push(`/projects/${id}`);
        window.location.reload();
      });
    }
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="comment">comment:</label>
          <input
            type="text"
            id="comment"
            placeholder="What is the comment of your pledge?"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="amount">amount:</label>
          <input type="number" id="amount" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="anonymous">Do you want to remain Anonymous:</label>
          <input
            type="radio"
            id="anonymous"
            name="anonymous"
            value="true"
            onChange={handleChange}
          />
          <label htmlFor="anonymous">Yes</label>
          <input
            type="radio"
            id="anonymous"
            name="anonymous"
            value="false"
            onChange={handleChange}
          />
          <label htmlFor="false">No</label>
        </div>

        <button className="button" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {id}
    </div>
  );
}

export default PledgeForm;
