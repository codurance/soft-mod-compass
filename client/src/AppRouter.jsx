import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import languageService from './services/languageService';

function AppRouter() {
  useEffect(() => {
    document.title = languageService.getTitle();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
