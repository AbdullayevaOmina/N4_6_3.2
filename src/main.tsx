// import React from "react";
import ReactDOM from "react-dom/client";
import Root from "@router";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <>
    <Root />
    <ToastContainer position="top-right" theme="colored"/>
  </>
  // </React.StrictMode>
);
