import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './routes/App/App';
import Landing from './routes/Landing/Landing';
import languageService from './services/languageService';

function AppRouter({ animationDelay }) {
  useEffect(() => {
    document.title = languageService.getTitle();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/questionnaire">
          <App animationDelay={animationDelay} />
        </Route>
        <Route path="/" component={Landing} />
      </Switch>
    </Router>
  );
}

AppRouter.propTypes = {
  animationDelay: PropTypes.number,
};

AppRouter.defaultProps = {
  animationDelay: null,
};

export default AppRouter;
