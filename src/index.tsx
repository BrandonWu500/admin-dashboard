import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  AuthContextProvider,
  AUTH_INIT_STATE,
} from './context/auth/authContext';
import {
  DarkModeContextProvider,
  INITIAL_STATE,
} from './context/darkMode/darkModeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DarkModeContextProvider {...INITIAL_STATE}>
      <AuthContextProvider {...AUTH_INIT_STATE}>
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
