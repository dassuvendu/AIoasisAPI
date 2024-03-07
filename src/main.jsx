import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "../src/stores/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { MetaMaskProvider } from "@metamask/sdk-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_SOCIAL_AUTH_GOOGLE_CLINT_ID}
  >
    <React.StrictMode>
      <MetaMaskProvider
        debug={false}
        sdkOptions={{
          dappMetadata: {
            name: "Example React Dapp",
            url: window.location.href,
          },
          // Other options
        }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </MetaMaskProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
