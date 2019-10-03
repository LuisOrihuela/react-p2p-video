import React, { Component } from "react";
import "./Dashboard.css";
import NavBar from "./NavBar";
import ChatCard from "./ChatCard";

class Dashboard extends Component {
  state = {
    user: [
      { creator: "Luis", level: "beginner", subject: "Friends fans" },
      {
        creator: "Eduardo",
        level: "intermediate",
        subject: "Any football fans welcome!"
      },
      { creator: "Luis", level: "beginner", subject: "Friends fans" },
      { creator: "Luis", level: "beginner", subject: "Friends fans" },
      {
        creator: "Eduardo",
        level: "intermediate",
        subject: "Any football fans welcome!"
      },
      { creator: "Luis", level: "beginner", subject: "Friends fans" }
    ],

    modalIsActive: false
  };

  activateModal = () => {
    this.setState({ modalIsActive: true });
  };

  render() {
    return (
      <div className="dashboard-container">
        <NavBar />
        <div className="container">
          <div className=" level">
            <h1 className="level-item welcome-title">Welcome to Talk-Talk!</h1>
          </div>
          <div className="level-item instructions">
            Join a chat room or{" "}
            <span
              className="tag is-white"
              onClick={this.setState(this.activateModal)}
            >
              create a new one
            </span>
            <span
              className={this.state.modalIsActive ? "modal" : "modal is-active"}
            >
              Create
              <div class="modal-background"></div>
              <div class="modal-content">Content</div>
              <button class="modal-close is-large" aria-label="close"></button>
            </span>
          </div>
          <div className="card-container">
            {this.state.user.map((user, id) => {
              return (
                <ChatCard
                  creator={user.creator}
                  level={user.level}
                  subject={user.subject}
                  key={id}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
