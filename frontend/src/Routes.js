import React from 'react';
import Home from './Home';
import Results from './Results';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const appRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/Results" element={<Results/>}></Route>
            </Routes>
        </Router>
    )
}

export default appRoutes;