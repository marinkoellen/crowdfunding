import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
function Nav() {
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
    return (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile/">Create User Account</Link>
      </nav>
    );
  }

  if (loggedin) {
    let username = window.localStorage.getItem("username");
    return (
      <nav>
        <Link to="/">Home {username} </Link>
        <Link to="/project-create">Create Project</Link>
        <Link to="/userprofile">{username}:Profile</Link>

        {/* <Link to="/login">Login</Link> */}
      </nav>
    );
  } else {
    return (
      <nav>
        <Link to="/"> Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile/">Create User Account</Link>
      </nav>
    );
  }
}

export default Nav;
