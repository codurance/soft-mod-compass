import { describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import translator from '../../config/translator';
import Landing from './Landing';

const fakeComponent = () => {
  return <p>fake component</p>;
};

describe('Landing should', () => {
  it('do the redirection when user clicks in the button', () => {
    const { getByText, queryByText } = render(
      <Router>
        <Switch>
          <Route path="/questionnaire" component={fakeComponent} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    );

    expect(queryByText('fake component')).not.toBeInTheDocument();
    getByText(translator.start).click();

    expect(getByText('fake component')).toBeInTheDocument();
  });
});
