import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import AppRoutes from "./AppRoutes.jsx";

import { AppProvider } from "./context/AppContext.jsx";

import { store } from "./store/store.js";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </Provider>
  </StrictMode>
);
