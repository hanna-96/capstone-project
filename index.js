import { Workbox } from "workbox-window";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import './public/style.css'
import Router from 'react-router-dom'
// import '../public/manifest.json'
import { BrowserRouter as Router } from 'react-router-dom'
import Amplify from 'aws-amplify'
import config from './config.json'

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const wb = new Workbox("/sw.js");
    const updateButton = document.querySelector("#app-update");
    // Fires when the registered service worker has installed but is waiting to activate.
    wb.addEventListener("waiting", event => {
      updateButton.classList.add("show");
      updateButton.addEventListener("click", () => {
      // Set up a listener that will reload the page as soon as the previously waiting service worker has taken control.
      wb.addEventListener("controlling", event => {
        window.location.reload();
      });

      // Send a message telling the service worker to skip waiting.
      // This will trigger the `controlling` event handler above.
      wb.messageSW({ type: "SKIP_WAITING" });
    });
    });

    wb.register();
  });

}

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
})

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));