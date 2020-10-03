import React from "react";
import { slide as Menu } from "react-burger-menu";

function SideBar(props) {
  return (
    // Pass on our props
    <Menu {...props}>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/Restaurant">
        Restaurant
      </a>

      <a className="menu-item" href="/">
        Food Trucks
      </a>

      <a className="menu-item" href="/">
        Food Product
      </a>
    </Menu>
  );
}

export default SideBar;
