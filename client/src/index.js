import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import { GlobalProvider } from './context/globalContext'; // Import GlobalProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GlobalProvider>  {/* Wrap the App with GlobalProvider */}
      <BrowserRouter>  {/* Wrap with BrowserRouter for routing */}
        <App />
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>
);
