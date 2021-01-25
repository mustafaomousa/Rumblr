import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import FeedPage from './components/FeedPage';
import ProfilePage from './components/ProfilePage';
import * as sessionActions from './store/session';
import { getPosts } from './store/post';
import { getAllVehicles } from './store/vehicle';
import { getLikes } from './store/like'
import WelcomePage from './components/WelcomePage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

    dispatch(getPosts())
    dispatch(getAllVehicles())
    dispatch(getLikes())
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true))
  }, [dispatch]);
  return (
    <>
      <Navigation />
      {isLoaded && (
        <Switch>
          <Route path='/welcome' component={WelcomePage} />
          <Route exact path='/feed' component={FeedPage} />
          <Route exact path='/profile' component={ProfilePage} />
          <Route path='/login' component={LoginFormPage} />
          <Route path='/signup' component={SignupFormPage} />
        </Switch>)}
    </>
  );
}

export default App;
