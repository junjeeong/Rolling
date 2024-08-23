// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: "https://rolling-api.vercel.app",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
