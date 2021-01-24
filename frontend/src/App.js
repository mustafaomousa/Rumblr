import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import FeedPage from './components/FeedPage';
import * as sessionActions from './store/session';
import { getPosts } from './store/post';
import { getAllVehicles } from './store/vehicle';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

    dispatch(getPosts())
    dispatch(getAllVehicles())
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true))
  }, [dispatch]);
  return (
    <>
      <Navigation />
      {isLoaded && (
        <Switch>
          <Route exact path='/' component={FeedPage} />
          <Route path='/login' component={LoginFormPage} />
          <Route path='/signup' component={SignupFormPage} />
        </Switch>)}
    </>
  );
}

export default App;
