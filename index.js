import { Workbox } from "workbox-window";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/app'
import './public/style.css'
// import { BrowserRouter as Router} from 'react-router-dom'
import { BrowserRouter as Router} from 'react-router-dom'
import store from './client/redux/store.js'
import {Provider} from 'react-redux'
import history from './client/history'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#89dfd1",
      main: "#57ada0",
      dark: "#217d72",
    },
    secondary: {
      main: "#c1514d",
      light: "#f88179",
      dark: "#8c2125",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const wb = new Workbox("/sw.js");
    const updateButton = document.querySelector("#app-update");
    // Fires when the registered service worker has installed but is waiting to activate.
    wb.addEventListener("waiting", (event) => {
      updateButton.classList.add("show");
      updateButton.addEventListener("click", () => {
        // Set up a listener that will reload the page as soon as the previously waiting service worker has taken control.
        wb.addEventListener("controlling", (event) => {
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

// Auth.configure({
//     mandatorySignIn: true,
//     region: config.cognito.REGION,
//     userPoolId: config.cognito.USER_POOL_ID,
//     userPoolWebClientId: config.cognito.APP_CLIENT_ID
// })

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
