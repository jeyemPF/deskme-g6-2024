import axios from "axios";

const API = axios.create({
  baseURL: "https://deskme-g6-2024-server.vercel.app/",
});

export const uploadAvatar = (data) =>
  API.patch("/users/self/avatar", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
