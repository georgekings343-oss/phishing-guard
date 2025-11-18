import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./Routes"; // or "./AppRoutes" if that's your file
import "./styles/tailwind.css"; // make sure this path exists

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
