// import libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
// import components
import App from './app.jsx';

// Retrieving the tag to insert the application
const root = ReactDOM.createRoot(document.getElementById('root'));
// Add components to tag
root.render(
    // <React.StrictMode> comment to avoid double render of useEffect
        <App />
    // </React.StrictMode>
);
