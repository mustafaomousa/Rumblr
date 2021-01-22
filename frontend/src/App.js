import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => dispatch(sessionActions.restoreUser())
    .then(() => setIsLoaded(true)), [dispatch]);
  return (
    <Switch>
      <Route path='/login' component={LoginFormPage} />
    </Switch>
  );
}

export default App;
