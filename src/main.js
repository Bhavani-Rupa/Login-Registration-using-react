// This is the starting point of the app.
// It loads global styles, sets up page navigation, and renders the main App.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';

// Global styles and Bootstrap (for layout and components)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

// Attach the React app to the <div id="root"> in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter enables changing pages without reloading the site */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
