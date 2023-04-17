import "bulmaswatch/superhero/bulmaswatch.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/cell-list";


const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList/>
      </div>
    </Provider>
  );
};
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
