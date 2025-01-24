import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ShopProvider } from "./context/ShopContext.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ShopProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ShopProvider>
  </StrictMode>
);
