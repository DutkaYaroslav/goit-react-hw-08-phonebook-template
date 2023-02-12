import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AuthContextProvider from 'components/store/Context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter basename="/goit-react-hw-08-phonebook-template">
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
