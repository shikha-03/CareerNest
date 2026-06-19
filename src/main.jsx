import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import LoadingScreen from "./components/feedback/LoadingScreen.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingScreen />}>
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
