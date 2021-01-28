import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import FeedPage from './components/FeedPage';
import ProfilePage from './components/ProfilePage';
import * as sessionActions from './store/session';
import { getAllUsers, getAllNewestUsers } from './store/session';
import { getPosts } from './store/post';
import { getAllVehicles } from './store/vehicle';
import { getLikes } from './store/like'
import WelcomePage from './components/WelcomePage';
import TagPage from './components/TagPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

    dispatch(getPosts())
    dispatch(getAllVehicles())
    dispatch(getLikes())
    dispatch(getAllUsers())
    dispatch(getAllNewestUsers())
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true))
  }, [dispatch]);

  const user = useSelector(state => state.session.user);

  return (
    <>
      <Navigation />
      {isLoaded && (
        <Switch>
          <Route exact path='/' component={WelcomePage} />
          <Route exact path='/feed' component={FeedPage} />
          <Route path={`/tag/`} component={TagPage} />
          {user && (<Route path={`/:username`} component={ProfilePage} />)}
          <Route exact path='/results' />
          <Route path='/login' component={LoginFormPage} />
          <Route path='/signup' component={SignupFormPage} />
        </Switch>)}
    </>
  );
}

export default App;
