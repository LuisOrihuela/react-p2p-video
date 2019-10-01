import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <React.Fragment>
      <div className="banner">
        <div className="banner-text">
          <h1>
            Speaking another language unveils a world of opportunities.
            <br />
            Start practicing today!
          </h1>
          <div className="banner-text-buttons">
            <Link to="/signup" className="button is-primary is-rounded">
              Sign up
            </Link>
            <Link to="/login" className="button is-info is-rounded">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
