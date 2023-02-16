import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  DarkModeContextProvider,
  INITIAL_STATE,
} from './context/darkModeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DarkModeContextProvider {...INITIAL_STATE}>
      <App />
    </DarkModeContextProvider>
  </React.StrictMode>
);
