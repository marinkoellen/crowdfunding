import React, { useState, useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

function PrivateRoute({ comp: Comp, ...props }) {
  const history = useHistory();
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
    history.push("/login");
    return null;
  }
}

export default PrivateRoute;
