import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { fetchAllAlbums } from "./store";
import { Component } from "./component";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Component />
  </Provider>,
  document.getElementById("root")
);

store.dispatch(fetchAllAlbums());
