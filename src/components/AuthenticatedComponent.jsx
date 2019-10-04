import React, { Component } from "react";
import { getJwt } from "./helpers/jwt";
// import axios from "axios";
import { withRouter } from "react-router-dom";

import axios from "./helpers/axios";

class AuthenticatedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    const jwt = getJwt();
    if (!jwt) {
      this.props.history.push("/login");
    }

    axios
      .get("/protected", {
        headers: { "auth-token": jwt }
      })
      .then(res => {
        // console.log(res.data._id);
        localStorage.setItem("id", res.data._id);
        this.setState({ user: res.data });
      })
      .catch(err => {
        localStorage.removeItem("user");
        localStorage.removeItem("id");
        this.props.history.push("/login");
      });
  }

  render() {
    if (this.state.user === undefined) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}
export default withRouter(AuthenticatedComponent);
