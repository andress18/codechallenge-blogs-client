import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import dotenv from 'dotenv';
// dotenvExpand.expand(myEnv)
// const dotenvExpand = require('dotenv-expand');
// const myEnv = dotenv.config()


ReactDOM.render(
    <Router>
        <Routes>
            <Route path='/' element={<App />} />
        </Routes>
    </Router >

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
