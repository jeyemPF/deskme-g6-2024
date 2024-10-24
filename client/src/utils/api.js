import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8800/",
});

export const uploadAvatar = (data) =>
  API.patch("/users/self/avatar", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
