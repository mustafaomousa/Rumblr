import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import WelcomePage from "./components/WelcomePage";
import AboutUs from "./components/AboutUs";
import QuickAction from "./components/QuickAction";
import SettingsPage from "./components/SettingsPage";
import { createTheme } from "@mui/system";
import Discover from "./components/Discover";

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
        {sessionUser && <Navigation />}
        <QuickAction />
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/about" component={AboutUs} />
          <Route exact path="/discover" component={Discover} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/results" />
        </Switch>
      </>
    )
  );
}

export default App;
