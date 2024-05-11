import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";

import "./services/Translations";
import "./index.css";
import store from "./redux/store";

/**
 * Create the root of the app
 */
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <main className="dark text-foreground">
          <App />
        </main>
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);
