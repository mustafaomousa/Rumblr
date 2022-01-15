import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

import * as sessionActions from "./store/session";
import ProtectedRoute from "./ProtectedRoute";
import components from "./components";
import { useAppSelector } from ".";
import { Box } from "@mui/system";

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const restoreUser = new Promise<any>((resolve) => {
        resolve(dispatch(sessionActions.restoreUser()));
      });

      restoreUser.then(() => setIsLoaded(true));
    })();
  }, [dispatch]);

  const sessionUser = useAppSelector((state) => state.session.user);

  return isLoaded ? (
    <>
      {sessionUser && (
        <>
          <components.Navigation />
          <components.BreadcrumbNavigation />
        </>
      )}
      <components.ScrollToTop>
        <Button color="secondary" variant="contained">
          <ArrowCircleUpIcon />
        </Button>
      </components.ScrollToTop>
      <div id="back-to-top-anchor" />
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
  ) : (
    <Box width="100%" position="fixed" top="50%" left="50%">
      <CircularProgress color="secondary" size="50px" />
    </Box>
  );
};

export default App;
