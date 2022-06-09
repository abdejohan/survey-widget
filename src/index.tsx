import React from "react";
import "./index.css";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";

const container = document.getElementById("app-root")!;

const root = ReactDOMClient.createRoot(container);
root.render(<App />);