import axios from "axios";

export const AxiosClient = axios.create({
  // baseURL: "http://127.0.0.1:1234/api/v1",
  baseURL: '/api/v1',
});