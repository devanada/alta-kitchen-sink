import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes/Routes";
import { Provider } from "react-redux";
import { store } from "./utils/redux/store/store";
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Routes />
  </Provider>
);
