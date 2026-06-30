import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-blockchain-assistant.onrender.com/api",
});

export default API;