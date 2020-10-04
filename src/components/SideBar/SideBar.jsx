import React, {useEffect, useState} from "react";
import {slide as Menu} from "react-burger-menu";

function SideBar(props) {
  const [categorylist, setCategorylist] = useState([]);

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

      {categorylist.map((cat) => (
        <a key={cat.name} className="menu-item" href={"/all/" + cat.name}>
          {cat.name + "s"}
        </a>
      ))}
    </Menu>
  );
}

export default SideBar;
