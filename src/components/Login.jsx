import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updatePassword = e => {
    setPassword(e.target.value);
  };

  const updateEmail = e => {
    setEmail(e.target.value);
  };

  const logIn = e => {
    e.preventDefault();
    const userData = {
      email,
      password
    };
    axios
      .post("http://localhost:4000/login", userData)
      .then(res => console.log(res.data));
  };
  return (
    <div className="flex-container">
      <div className="box  sign-up-container">
        <form onSubmit={logIn}>
          <div className="tabs">
            <ul>
              <li className="is-active">
                <Link to="/login">Log in</Link>
              </li>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            </ul>
          </div>

          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input is-medium is-rounded"
                type="email"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
              <span className="icon is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-right">
                <i className="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input is-medium is-rounded"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="submit-section">
            <div className="submit-button">
              <button className="button is-primary is-rounded" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
