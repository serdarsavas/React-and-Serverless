import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ScoreProvider } from './contexts/ScoreContext';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain='jqq-learn-build-type.eu.auth0.com'
      clientId='4sh0sfZFq6EjJsMKohncrGD1IufHuAja'
      redirectUri={window.location.origin}
    >
      <ScoreProvider>
        <App />
      </ScoreProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
