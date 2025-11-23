
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./styles/tailwind.css";

import { PopupProvider } from "./contexts/PopupContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PopupProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PopupProvider>
  </React.StrictMode>
); 