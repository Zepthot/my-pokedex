// import libraries
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
// import components
import Header from './components/header';
import Home from './pages/home';

// App function with routes, components and state language
function App () {
    return (
        <BrowserRouter>
            <Header />
            <Home />
        </BrowserRouter>
    );
}
// Export to call it up in index.js
export default App;