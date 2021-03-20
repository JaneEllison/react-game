import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './core/store/store';

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);
