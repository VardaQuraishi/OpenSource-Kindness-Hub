import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; // Import the reportWebVitals function

import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client

const root = createRoot(document.getElementById('root')); // Use createRoot from react-dom/client
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Call the reportWebVitals function to measure performance metrics
reportWebVitals(console.log); // You can pass a function to log the results or use your preferred analytics endpoint
