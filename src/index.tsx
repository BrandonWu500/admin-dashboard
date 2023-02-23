import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  AuthContextProvider,
  AUTH_INIT_STATE,
} from './context/auth/authContext';
import { INIT_STATE, ThemeContextProvider } from './context/theme/themeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeContextProvider {...INIT_STATE}>
      <AuthContextProvider {...AUTH_INIT_STATE}>
        <App />
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
