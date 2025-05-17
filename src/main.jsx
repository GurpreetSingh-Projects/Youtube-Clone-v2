import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Test } from "./components/Test.jsx";
import Footer from "./components/Footer.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./styles.css";
import Welcome from "./components/Welcome.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      {/* <App /> */}
      <Welcome />
    </Provider>
    {/* <Test /> */}
  </>
);
