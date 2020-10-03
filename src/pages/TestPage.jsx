import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../components/SideBar/SideBar.css";
import { Link } from "react-router-dom";
import "./TestPage.css";

function TestPage() {
  const [modalState, setModalState] = useState(false);

  const manageState = () => {
    setModalState(!modalState);
  };

  //   useEffect(() => {
  //     fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
  //       .then((results) => {
  //         return results.json();
  //       })
  //       .then((data) => {
  //         setProjectData(data);
  //       });
  //   }, [id]);

  return (
    <div className="App2">
      <div className={`modalBackground modalShowing-${modalState}`}>modal</div>
      <button onClick={() => manageState()}>Open modal</button>
    </div>
  );
}

export default TestPage;
