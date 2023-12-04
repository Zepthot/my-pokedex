// import libraries
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
// import components
import Header from './components/header';
import Home from './pages/home';
import Pokemon from './pages/pokemon';

// App function with routes, components and state language
function App () {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path=':id' element={<Pokemon />} />
            </Routes>
        </BrowserRouter>
    );
}
// Export to call it up in index.js
export default App;