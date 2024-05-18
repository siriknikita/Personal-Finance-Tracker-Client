import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Move provider to App.js and clientId to .env file

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <GoogleOAuthProvider clientId="1018702170327-95j8q5mmddj961etl76egf8jfc0nikrs.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
    // </React.StrictMode>
);
