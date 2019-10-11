import React from "react";
import "./ChatCard.css";
import { Link } from "react-router-dom";

const Chatcard = ({ creator, level, subject, creatorId }) => {
  const getCreatorId = () => {
    localStorage.setItem("creatorID", creatorId);
  };

  const getClassName = level => {
    if (level === "Beginner") return "tag is-success";
    if (level === "Intermediate") return "tag is-warning";
    if (level === "Advanced") return "tag is-danger";
  };

  return (
    <div className="card card-color">
      <header className="card-header">
        <div className="card-header-title">
          <span className="tag is-link">
            {" "}
            <i className="user-icon far fa-user"></i> {creator}
          </span>
          <br />
          <span className={getClassName(level)}>Level: {level}</span>
        </div>
        {/* <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a> */}
      </header>
      <div className="card-content">
        {(subject && (
          <div className="content">
            <span className="tag is-light">Subject: {subject}</span>

            <br />
          </div>
        )) || (
          <div className="content">
            <span className="tag is-light">Subject: Any subject</span>
            <br />
          </div>
        )}
      </div>
      <footer className="card-footer">
        <Link
          to={"/chatroom/" + creatorId}
          className="card-footer-item"
          onClick={getCreatorId}
        >
          Join
        </Link>
      </footer>
    </div>
  );
};

export default Chatcard;
