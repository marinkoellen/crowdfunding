import React from "react";
import "./Loader.css";
import { Ellipsis } from "react-spinners-css";

function Loader() {
  return (
    <div>
      <Ellipsis color="#2e2c38" size={200} />
    </div>
  );
}

export default Loader;
