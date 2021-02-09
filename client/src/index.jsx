import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import './assets/images/favicon.ico';
import './index.css';

ReactDOM.render(
  <AppRouter animationDelay={700} />,
  document.getElementById('root')
);
