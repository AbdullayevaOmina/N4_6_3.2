import React from "react";
import ReactDOM from "react-dom/client";
import Root from "@router";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Axios
import axios from "axios";

axios.defaults.baseURL = "http://45.138.158.252:3000";
const token = localStorage.getItem("userToken");
axios.defaults.headers.common["x-auth-token"] = token;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
    <ToastContainer position="top-right" theme="colored" />
  </React.StrictMode>
);
