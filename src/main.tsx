import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

import { getRouter } from './core/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={getRouter()}/>
  </React.StrictMode>
)
