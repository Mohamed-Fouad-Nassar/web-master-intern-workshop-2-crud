// main.jsx
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // small fix: react-router -> react-router-dom

import AppRoutes from "./AppRoutes.jsx";
import { AppProvider } from "./contexts/AppContext.jsx";

import { store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
