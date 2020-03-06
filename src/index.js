import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter,Route,Switch,Redirect,BrowserRouter} from 'react-router-dom'
import Main from "./pages/Main"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ExamineeMain from "./pages/examinee/ExamineeMain"
import AdminMain from "./pages/admin/AdminMain"
import App from "./App"

ReactDOM.render(
    (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    ),
    document.getElementById('root'));

