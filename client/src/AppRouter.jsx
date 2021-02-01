import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './routes/App/App';
import Landing from './routes/Landing/Landing';
import languageService from './services/languageService';
import './styles/global.scss';

function AppRouter() {
  useEffect(() => {
    document.title = languageService.getTitle();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/questionnaire" component={App} />
        <Route path="/" component={Landing} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
