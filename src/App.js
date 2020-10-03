import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import ProjectEditPage from "./pages/EditProjectPage";
import TestPage from "./pages/TestPage";

import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PledgePage from "./pages/PledgePage";

import CreateProjectPage from "./pages/CreateProjectPage";
import CreateUserPage from "./pages/CreateUserPage";
import SideBar from "./components/SideBar/SideBar.jsx";
import "./components/SideBar/SideBar.css";

export default function App() {
  return (
    <div id="App">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
      <div id="page-wrap">
        <h1>Nibble 🍔🍕</h1>
      </div>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/profile/">
              <CreateUserPage />
            </Route>

            <Route exact path="/test/">
              <TestPage />
            </Route>

            <PrivateRoute
              path="/project-create/"
              comp={CreateProjectPage}
            ></PrivateRoute>

            <Route exact path="/pledge/:id">
              <PledgePage />
            </Route>

            {/* <PrivateRoute path="/pledge/:id" comp={PledgePage}></PrivateRoute> */}

            <PrivateRoute path="/userprofile" comp={ProfilePage}></PrivateRoute>

            <Route path="/projects/edit/:id">
              <ProjectEditPage />
            </Route>

            <Route path="/projects/:id">
              <ProjectPage />
            </Route>

            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
