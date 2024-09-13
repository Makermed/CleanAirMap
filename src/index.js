/* eslint-disable linebreak-style */
import React from "react";
import ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import App from "./App";
import store from "./store";
import ThemeWrapper from "./ThemeWrapper";
ReactDOM.render(
  <StoreProvider store={store}>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </StoreProvider>,
  document.getElementById("root")
);
