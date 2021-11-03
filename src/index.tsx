import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './views/HomePage';
import { LoginPage } from './views/LoginPage';

ReactDOM.render(
  <React.StrictMode>
      <HomePage />
  </React.StrictMode>,
  document.getElementById('root')
);

