import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import BoardContextProvider from "./Context/BoardContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BoardContextProvider>
        <App />
      </BoardContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
