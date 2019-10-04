import axios from "axios";

const instance = axios.create({
  baseURL: "https://p2p-backend.herokuapp.com",
  // baseURL: "http://localhost:4000",
  timeout: 3000
});

export default instance;
