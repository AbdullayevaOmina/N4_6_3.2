import axios from "axios";

const http = axios.create({
  baseURL: "http://45.138.158.252:3000",
});

http.interceptors.request.use((config) => {
  let token = localStorage.getItem("userToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
	return config
});

export default http