import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18+
import App from './App'; // Assuming you have an App component

const rootElement = document.getElementById("root");

const root= ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
