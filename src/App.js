import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css"
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

          <Route path="/projects/:id">
            <ProjectPage />
          </Route>

        </Switch>
      </div>
    </Router>
  )
}