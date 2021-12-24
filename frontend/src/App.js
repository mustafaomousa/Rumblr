import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import WelcomePage from "./components/WelcomePage";
import AboutUs from "./components/AboutUs";
import QuickAction from "./components/QuickAction";
import SettingsPage from "./components/SettingsPage";
import { Box, createTheme } from "@mui/system";
import Discover from "./components/Discover";
import Profile from "./components/Profile";
import { Button, Toolbar, useScrollTrigger, Zoom } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);

  return (
    isLoaded && (
      <>
        <ScrollTop>
          <Button color="secondary" variant="contained">
            <ArrowCircleUpIcon />
          </Button>
        </ScrollTop>
        <div id="back-to-top-anchor" disableGutters />
        {sessionUser && <Navigation />}
        <QuickAction />
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/about" component={AboutUs} />
          <Route exact path="/discover" component={Discover} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/results" />
          <Route exact path="/user/:userId" component={Profile} />
        </Switch>
      </>
    )
  );
}

export default App;
