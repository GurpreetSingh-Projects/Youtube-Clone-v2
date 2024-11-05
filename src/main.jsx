import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Test } from "./components/Test.jsx";
import Footer from "./components/Footer.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
    {/* <Test /> */}
  </>
);
