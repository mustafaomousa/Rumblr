import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import DiscoverPage from "./components/DiscoverPage";
import * as sessionActions from "./store/session";
import WelcomePage from "./components/WelcomePage";
import AboutUsPage from "./components/AboutUsPage";
import QuickAction from "./components/QuickAction";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const user = useSelector((state) => state.session.user);

  return (
    <>
      <Navigation />
      <QuickAction />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/about" component={AboutUsPage} />
          <Route exact path="/discover" component={DiscoverPage} />
          <Route exact path="/results" />
          <Route path="/login" component={LoginFormPage} />
          <Route path="/signup" component={SignupFormPage} />
        </Switch>
      )}
    </>
  );
}

export default App;
