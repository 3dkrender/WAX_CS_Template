import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

/**
 * Create the root of the app
 */
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground">
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
