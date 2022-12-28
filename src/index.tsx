import { createBrowserHistory } from "history";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import configureStore from "./configureStore";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const history = createBrowserHistory();
const initialState = window.INITIAL_REDUX_STATE;
const store = configureStore(history, initialState);

const container = document.getElementById("root");
const root = createRoot(container!);
// regarding deactivated StrictMode: see https://github.com/react-keycloak/react-keycloak/issues/93
root.render(
  // <React.StrictMode>
  <App store={store} history={history} />
  // </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
