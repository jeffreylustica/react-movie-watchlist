import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import {ContextProvider} from "./MovieContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <HashRouter>
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </HashRouter>
  </ContextProvider>
);

