import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#f0ece4',
                border: '1px solid #3d3d3d',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#c8a96e', secondary: '#1a1a1a' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#1a1a1a' } },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
