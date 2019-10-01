import axios from "axios";

const instance = axios.create({
  baseURL: "https://p2p-backend.herokuapp.com",
  timeout: 1000
});

export default instance;
