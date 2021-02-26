import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import './assets/images/favicon.ico';
import './index.css';
import './styles/global.scss';

ReactDOM.render(
  <AppRouter animationDelay={500} />,
  document.getElementById('root')
);
