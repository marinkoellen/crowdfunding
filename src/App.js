import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";


export default function App(){
  return(
    <Router>
      <div>
        <Nav />
        <Switch>
        <Route exact path="/">
            <HomePage />
          </Route>

          <Route path="/project">
            <ProjectPage />
          </Route>

        </Switch>
      </div>
    </Router>
  )
}