import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { LiveDataProvider } from "./context/LiveDataContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LiveDataProvider>
      <App />
    </LiveDataProvider>
  </StrictMode>
);