import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const removeToken = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    localStorage.removeItem("creatorID");
  };

  return (
    <nav className="navbar is-transparent">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/dashboard">
          <span className="icon-text">Talk-Talk</span>
          <img
            src="https://img.icons8.com/ios/50/000000/very-popular-topic.png"
            width="30"
            height="30"
            alt="talk-talk icon"
            className="icon"
          ></img>
        </Link>

        <div
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {/* <a className="navbar-item">Home</a> */}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control"></p>
              <p className="control">
                <Link
                  className="button is-black"
                  to="/login"
                  onClick={removeToken}
                >
                  <span className="icon">
                    <i alt="Logout icon" className="fas fa-sign-out-alt"></i>
                  </span>
                  <span>Log out</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
