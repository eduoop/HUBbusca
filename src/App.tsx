import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import UserRepos from './pages/UserRepos';
import React from 'react'

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/user' element={<UserRepos/>}></Route>
            </Routes>
        </Router>
    )
}

export default App;
