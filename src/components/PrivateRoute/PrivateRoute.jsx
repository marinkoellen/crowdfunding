import React, { useState, useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

function PrivateRoute({ comp: Comp, ...props }) {
  const [loggedin, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = () => {
    let token = window.localStorage.getItem("token");
    if (token != null) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setLoggedIn(isAuthenticated());
    setLoading(false);
  }, []);

  if (loading === true) {
    return <h1>Loading....</h1>;
  }

  if (loggedin) {
    return <Comp {...props} />;
  } else {
    return <div>
      <h4 id="headerTitle">You have tried to access a page that you do not have permission to view without logging in! <br></br><br></br> Please log in and try again</h4>
      <LoginForm />{" "}
      <br></br><br></br>
    </div>
  }
}

export default PrivateRoute;
