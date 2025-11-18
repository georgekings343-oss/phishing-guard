import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ wrap your app
import AppRoutes from "./Routes";
import "./styles/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
