import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import LogoutForm from "../LogoutForm/LogoutForm.jsx";

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
      <div>
        <nav>
          <Link to="/">Home </Link>
          <Link to="/project-create">Create Project</Link>
          <Link to="/userprofile">{username}:Profile</Link>
        </nav>
        <LogoutForm />
      </div>
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
