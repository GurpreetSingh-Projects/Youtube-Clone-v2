import ReactDOM from "react-dom/client";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./styles.css";
import Welcome from "./components/Welcome";
import { App } from "./App";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      {/* <Welcome firstRender={true} /> */}
      <App />
    </Provider>
  </>
);
