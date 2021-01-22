import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => dispatch(sessionActions.restoreUser())
    .then(() => setIsLoaded(true)), [dispatch]);
  return (
    <>
      <Navigation />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <h1>Home</h1>
          </Route>
          <Route path='/login' component={LoginFormPage} />
          <Route path='/signup' component={SignupFormPage} />
        </Switch>)}
    </>
  );
}

export default App;
