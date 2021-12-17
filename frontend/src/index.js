import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { restoreCSRF, fetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import * as postActions from "./store/post";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = fetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.postActions = postActions;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#333A56",
    },
    secondary: {
      main: "#e8e8e8",
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

function Root() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
