import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import { IonApp } from "@ionic/react";

ReactDOM.render(
  <Provider store={store}>
    <IonApp>
      <Routes />
    </IonApp>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
