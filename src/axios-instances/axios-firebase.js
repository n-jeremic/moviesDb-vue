import axios from "axios";

const instance = axios.create({
  baseURL: "https://movies-database-b34ac.firebaseio.com/"
});

export default instance;
