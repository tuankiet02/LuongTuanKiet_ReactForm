import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import XuLyForm from "./Render/XuLyForm";
import { store } from "./Redux/rootRedux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <XuLyForm />
  </Provider>
);
