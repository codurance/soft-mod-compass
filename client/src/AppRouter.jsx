import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';

function AppRouter() {
  const setLanguage = (language) => {
    localStorage.setItem('language', language);
  };

  return (
    <Router>
      <Switch>
        <Route path="/es">
          {setLanguage('es')}
          <App />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
