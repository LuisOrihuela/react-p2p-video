import React from "react";
import "./ChatCard.css";
import { Link } from "react-router-dom";

const Chatcard = ({ creator, level, subject, creatorId }) => {
  return (
    <div className="card card-color">
      <header className="card-header">
        <p className="card-header-title">
          Host: {creator}
          <br />
          Level: {level}
        </p>
        <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div className="card-content">
        <div className="content">
          Subject: {subject}
          <br />
        </div>
      </div>
      <footer className="card-footer">
        <Link to={"/chatroom/" + creatorId} className="card-footer-item">
          Join
        </Link>
      </footer>
    </div>
  );
};

export default Chatcard;
