import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap";
//import 'bootstrap/dist/js/bootstrap.bundle';
//import "jquery/dist/jquery";
import "@fortawesome/fontawesome-free/css/all.css";
import 'antd/dist/antd.css';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './AppRouter';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
