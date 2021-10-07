import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./components/ContextProviders/UserContext";

require("dotenv").config();
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain={`${AUTH0_DOMAIN}`}
    clientId={`${AUTH0_CLIENT_ID}`}
    redirectUri={window.location.origin}
  >
    <UserProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
