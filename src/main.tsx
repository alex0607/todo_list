import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
