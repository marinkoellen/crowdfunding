import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import LogoutForm from "../LogoutForm/LogoutForm.jsx";
import logo from '../../icons/Nibble_Solid_Dark_Grey.png';

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


  const handleSubmit = (e) => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (loading === true) {
    return (
      <nav>
        <Link to="/login">Login</Link>
      </nav>
    );
  }


  if (loggedin) {
    return (
      <div className="navbarcontainer">
        <Link onClick={handleSubmit} id="logintop" to="/">LOGOUT</Link>

        <div id="navbar">
          <img id="nibblelogo" src={logo} alt="Logo" />
        </div>
      </div>
    )
  } else {
    return (
      <div className="navbarcontainer">
        <Link id="logintop" to="/login">LOGIN</Link>
        <div id="navbar">
          <img id="nibblelogo" src={logo} alt="Logo" />
        </div>
      </div>
    )
  }
}

export default Nav;
