/* eslint-disable linebreak-style */
import React from "react";
import ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

import * as serviceWorker from "./serviceWorker";

import { configureStore } from "./store";
import App from "./App";
import { Firebase, FirebaseContext } from "services";
import ThemeWrapper from "./ThemeWrapper";

const getLibrary = (provider) => {
  return new Web3(provider)
}

const store = configureStore();

ReactDOM.render(
  <StoreProvider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <ThemeWrapper>
        <Web3ReactProvider getLibrary={getLibrary}>
          <App />
        </Web3ReactProvider>
      </ThemeWrapper>
    </FirebaseContext.Provider>
  </StoreProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
