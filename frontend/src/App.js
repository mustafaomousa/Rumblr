import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Box, Button, Divider } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import * as sessionActions from "./store/session";
import ProtectedRoute from "./ProtectedRoute";
import components from "./components";

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
        <components.ScrollToTop>
          <Button color="secondary" variant="contained">
            <ArrowCircleUpIcon />
          </Button>
        </components.ScrollToTop>
        <div id="back-to-top-anchor" />
        {sessionUser && (
          <>
            <components.Navigation />
            <components.BreadcrumbNavigation />
          </>
        )}
        <Switch>
          <Route exact path="/" component={components.WelcomePage} />
          <ProtectedRoute path="/about" component={components.About} />
          <ProtectedRoute
            exact
            path="/discover"
            component={components.Discover}
          />
          <ProtectedRoute
            exact
            path="/settings"
            component={components.Settings}
          />
          <ProtectedRoute
            exact
            path="/users/:userId"
            component={components.Profile}
          />
        </Switch>
        <components.LargeFooter />
        <components.Footer />
      </>
    )
  );
}

export default App;
