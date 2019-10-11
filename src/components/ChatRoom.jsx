import React, { Component } from "react";
import { Link } from "react-router-dom";
import openSocket from "socket.io-client";
import Peer from "simple-peer";
import "./ChatRoom.css";
import axios from "./helpers/axios";
let userid = localStorage.getItem("id");

let client = {};
let peer;
const socket = openSocket("https://p2p-backend.herokuapp.com/chatroom");
// const socket = openSocket("http://localhost:4000/chatroom");

class ChatRoom extends Component {
  state = {
    messages: [],
    newMessage: "",
    buttonStyle: {
      background: "black"
    },
    loading: true,
    name: ""
  };

  componentDidMount = stream => {
    let { id } = this.props.match.params;

    axios.get("/user/" + userid).then(res => {
      this.setState({ name: res.data });
    });

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true
      })
      .then(stream => {
        socket.emit("NewClient", { roomId: id });
        let video = document.querySelector("video");
        video.srcObject = stream;
        video.play();

        const InitPeer = type => {
          console.log("InitPeer");
          peer = new Peer({
            initiator: type === "init" ? true : false,
            stream: stream,
            trickle: false
          });

          peer.on("stream", function(stream) {
            console.log("Entered stream");
            CreateVideo(stream);
          });
          peer.on("close", () => {
            // document.getElementById("peerVideo").remove();
            peer.destroy();
          });
          peer.on("data", data => {
            this.setState({
              messages: [...this.state.messages, `${data}`]
            });
          });

          return peer;
        };

        const RemoveVideo = () => {
          console.log("Removing peer video");
          // document.getElementById("peerVideo").remove();
        };

        //for initiator peer
        const MakePeer = () => {
          console.log("Creating new initiator peer");
          client.gotAnswer = false;
          let peer = InitPeer("init");
          peer.on("signal", data => {
            console.log("Make peer-on signal");
            if (!client.gotAnswer) {
              console.log("entró!");
              socket.emit("Offer", data);
            }
          });
          client.peer = peer;
        };

        // for non initiator peer
        const FrontAnswer = offer => {
          console.log("Creating new non-initiator peer");
          let peer = InitPeer("notInit");
          peer.on("signal", data => {
            socket.emit("Answer", data);
          });
          peer.signal(offer);
        };

        //Response from the backend
        const signalAnswer = answer => {
          client.gotAnswer = true;
          let peer = client.peer;
          peer.signal(answer);
        };

        const CreateVideo = stream => {
          console.log("CreateVideo: ");
          // let video = document.createElement("video");
          let video = document.getElementById("peerVideo");
          // video.id = "peerVideo";
          // video.className = "video";
          video.srcObject = stream;
          this.setState({ loading: false });
          // document.querySelector(".video-container").appendChild(video);
          video.play();
        };

        const SessionActive = () => {
          document.write("Session Active. Please come back later");
        };

        socket.on("BackOffer", FrontAnswer);
        socket.on("BackAnswer", signalAnswer);
        socket.on("SessionActive", SessionActive);
        socket.on("CreatePeer", MakePeer);
        socket.on("RemoveVideo", RemoveVideo);
      })
      .catch(err => console.log(err));
  };

  sendMessage = () => {
    if (this.state.newMessage.trim() === "") {
      return;
    } else {
      console.log("send message");
      if (peer) {
        peer.send(`${this.state.name}: ${this.state.newMessage}`);
      }

      this.setState({
        messages: [
          ...this.state.messages,
          `${this.state.name}: ${this.state.newMessage}`
        ],
        newMessage: ""
      });
    }
  };

  updateMessage = e => {
    console.log(e.target.value);
    this.setState({
      newMessage: e.target.value
    });
  };

  keyPressed = e => {
    if (e.keyCode === 13) {
      this.sendMessage();
    }
  };

  endCall = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className="chatroom-container">
        <div className="video-container">
          <div className="videos">
            <video id="local-video" className="video" muted></video>
            <video id="peerVideo"></video>
            {this.state.loading && (
              <div className="progressbar-container">
                <progress
                  className="progress is-primary progressbar"
                  max="100"
                />
              </div>
            )}
          </div>

          <i
            onClick={this.endCall}
            id="btn"
            className="fas fa-phone-slash button is-danger"
          ></i>
        </div>

        <div className="chat-container divider">
          <div className="messages-container">
            <div id="messages">
              {this.state.messages.map((message, index) => {
                return (
                  <div key={index}>
                    <p
                      className={
                        message.startsWith(this.state.name)
                          ? "message tag is-success"
                          : "message tag is-link"
                      }
                    >
                      {message}
                    </p>
                    <br />
                  </div>
                );
              })}
              {/* {this.state.messages} */}
            </div>
          </div>
          <div id="messagebox-container">
            <textarea
              placeholder="Enter a message"
              onChange={e => this.updateMessage(e)}
              value={this.state.newMessage}
              id="messagebox"
              onKeyDown={this.keyPressed}
            ></textarea>
            <button
              onClick={this.sendMessage}
              className={
                this.state.newMessage.trim() === ""
                  ? "button-disabled"
                  : "button-enabled"
              }
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
