import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const removeToken = () => {
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar is-transparent">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          {/* <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Bulma: a modern CSS framework based on Flexbox"
            width="112"
            height="28"
          /> */}
          <i class="far fa-comments"></i>
        </a>
      </div>

      <div id="navbarExampleTransparentExample" className="navbar-menu">
        <div className="navbar-start"></div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control"></p>
              <p className="control">
                <Link
                  className="button is-primary"
                  to="/login"
                  onClick={removeToken}
                >
                  <span className="icon">
                    <i class="fas fa-sign-out-alt"></i>
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
