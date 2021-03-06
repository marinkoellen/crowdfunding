import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import ProjectEditPage from "./pages/EditProjectPage";
import ProfileEditPage from "./pages/EditProfilePage";

import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PledgePage from "./pages/PledgePage";
import PublicProfilePage from "./pages/PublicProfilePage";
import FirstPage from "./pages/FirstPage";

import CreateProjectPage from "./pages/CreateProjectPage";
import CreateUserPage from "./pages/CreateUserPage";
import CategoryPage from "./pages/CategoryPage";

import SideBar from "./components/SideBar/SideBar.jsx";
import "./components/SideBar/SideBar.css";

export default function App() {
  return (
    <div id="App">

      <Router>
        <div id="testcenter">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />

          <Nav />

          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/all/:project_id/">
              <CategoryPage />
            </Route>

            <Route exact path="/profile/">
              <CreateUserPage />
            </Route>


            <PrivateRoute
              path="/project-create/"
              comp={CreateProjectPage}
            ></PrivateRoute>

            <Route exact path="/pledge/:id">
              <PledgePage />
            </Route>

            <Route exact path="/userprofile/:id">
              <PublicProfilePage />
            </Route>

            <PrivateRoute
              path="/edit-userprofile/"
              comp={ProfileEditPage}
            ></PrivateRoute>

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

            <Route path="/firstpage">
              <FirstPage />
            </Route>

          </Switch>
        </div>
      </Router>
    </div>
  );
}
