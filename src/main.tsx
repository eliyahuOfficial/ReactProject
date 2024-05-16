import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider, } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { router } from "./routes/router.tsx"
import { AuthContextProvider } from "./contexts/AuthContext.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);