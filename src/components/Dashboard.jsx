import React, { Component } from "react";
import "./Dashboard.css";
import NavBar from "./NavBar";
import ChatCard from "./ChatCard";
import axios from "./helpers/axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatrooms: [],
      modalIsActive: false,
      level: "Beginner",
      subject: "",
      user: "",
      creatorId: ""
    };
  }

  componentDidMount() {
    axios.get("/user/dashboard").then(res => {
      this.setState({ chatrooms: res.data });
    });
  }

  toggleModal = () => {
    this.setState({ modalIsActive: !this.state.modalIsActive });
  };

  handleSelection = e => {
    this.setState({ level: e.target.value });
  };

  handleText = e => {
    this.setState({ subject: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.toggleModal();

    let chatroom = {
      level: this.state.level,
      subject: this.state.subject,
      id: localStorage.getItem("id")
    };

    axios.post("/user/dashboard", chatroom).then(res => {
      const chatroom = res.data;
      this.setState({ creatorId: chatroom.creatorId });
      this.setState({ chatrooms: [...this.state.chatrooms, chatroom] });
    });
    const redirect = "/chatroom/" + localStorage.getItem("id");
    this.props.history.push(redirect);
  };

  checkForUpdates = () => {
    axios.get("/user/dashboard").then(res => {
      console.log(res.data);
      this.setState({ chatrooms: res.data });
    }, 5000);
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
            <span className="tag is-white" onClick={this.toggleModal}>
              create a new one
            </span>
            <span
              className={this.state.modalIsActive ? "modal is-active" : "modal"}
            >
              Create
              <div className="modal-background"></div>
              <div className="modal-content">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Level</label>
                    <div className="control">
                      <div className="select">
                        <select
                          value={this.state.level}
                          onChange={this.handleSelection}
                          name="level"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <input
                      placeholder="I would like to talk about..."
                      type="text"
                      name="subject"
                      value={this.state.subject}
                      onChange={this.handleText}
                    ></input>
                  </div>
                  <button
                    className="button is-primary is-rounded"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
              <button
                className="modal-close is-large"
                aria-label="close"
                onClick={this.toggleModal}
              ></button>
            </span>
          </div>
          <div className="card-container">
            {this.state.chatrooms.map((chatroom, id) => {
              return (
                <ChatCard
                  creator={chatroom.creator}
                  level={chatroom.level}
                  subject={chatroom.subject}
                  creatorId={chatroom.creatorId}
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
