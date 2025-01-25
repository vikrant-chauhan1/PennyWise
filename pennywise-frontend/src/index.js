import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App.js'; 
import { UserProvider } from './UserContext';

const rootElement = document.getElementById("root");

const root= ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
       
    </React.StrictMode>
)
