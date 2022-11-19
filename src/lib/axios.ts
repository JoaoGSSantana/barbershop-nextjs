import axios from "axios";

export const api = axios.create({
  baseURL: "https://serene-refuge-29711.herokuapp.com/",
});
