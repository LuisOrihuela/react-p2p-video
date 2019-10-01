/* eslint-disable no-restricted-globals */
// import Webcam from "react-webcam";
import React, { Component } from "react";
import "./App.css";
import "typeface-roboto";
import ChatRoom from "./components/ChatRoom.jsx";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import AuthenticatedComponent from "./components/AuthenticatedComponent";
import "bulma/css/bulma.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* <NavBar /> */}
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <AuthenticatedComponent>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/chatroom" component={ChatRoom} />
          </AuthenticatedComponent>
        </Switch>
      </Router>
    );
  }
}

export default App;
