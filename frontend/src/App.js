import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import DiscoverPage from "./components/DiscoverPage";
import * as sessionActions from "./store/session";
import WelcomePage from "./components/WelcomePage";
import AboutUsPage from "./components/AboutUsPage";
import QuickAction from "./components/QuickAction";
import SettingsPage from "./components/SettingsPage";
import { createTheme } from "@mui/system";

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
        <div>
          <QuickAction />
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route path="/about" component={AboutUsPage} />
            <Route exact path="/discover" component={DiscoverPage} />
            <Route exact path="/settings" component={SettingsPage} />
            <Route exact path="/results" />
          </Switch>
        </div>
      </>
    )
  );
}

export default App;
