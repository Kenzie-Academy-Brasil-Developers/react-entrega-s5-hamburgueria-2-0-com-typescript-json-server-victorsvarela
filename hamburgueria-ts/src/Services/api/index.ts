import axios from "axios";

const api = axios.create({
  baseURL: "https://api-kenzieburger.herokuapp.com/",
});

export default api;
