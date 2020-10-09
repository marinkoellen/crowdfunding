import React, { useEffect, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useHistory } from "react-router-dom";

function SideBar(props) {
  const [categorylist, setCategorylist] = useState([]);

  const [loggedin, setLoggedIn] = useState(false);
  let username = window.localStorage.getItem("username");

  const isAuthenticated = () => {
    let token = window.localStorage.getItem("token");

    if (token != null) {
      return true;
    } else {
      return false;
    }
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}categories/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setCategorylist(data);
      });
  }, []);

  return (
    // Pass on our props
    <Menu {...props}>

      <a className="menu-item" href="/">
        Home
      </a>

      {loggedin && (<a className="menu-item" href="/userprofile">
        Account: {username}
      </a>)}


      {!loggedin && (<a className="menu-item" href="/profile/">
        Sign up to Nibble!
      </a>)}

      {loggedin && (<a className="menu-item" href="/project-create">
        Create a Project
      </a>)}


      <a className="menu-item" href="/">
        All Projects
      </a>

      {categorylist.map((cat) => (
        <a id="cat" key={cat.name} className="menu-item" href={"/all/" + cat.name}>
          {cat.name + "s"}
        </a>
      ))}








    </Menu>
  );
}

export default SideBar;



