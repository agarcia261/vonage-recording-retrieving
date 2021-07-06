import React, { Component } from "react";
import TokenForm from "./components/TokenForm";
import NavBar from './components/Nav'

import {BrowserRouter as Router, Route} from "react-router-dom"
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (

      <Router>
        <div>
          <NavBar/>
          <Route exact path="/" component={TokenForm}/>
        </div>
      </Router>
    );
  }
}

export default App;
