import axios from "axios";

const movieAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

const flaskAPI = axios.create({
  baseURL: "http://127.0.0.1:8080/",
});
export { movieAPI, flaskAPI };
