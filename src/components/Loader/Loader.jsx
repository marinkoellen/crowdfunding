import React from "react";
import "./Loader.css";
import { Ellipsis } from "react-spinners-css";

function Loader() {
  return (
    <div>
      <Ellipsis color="#be97e8" size={200} />
    </div>
  );
}

export default Loader;
