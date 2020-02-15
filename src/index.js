import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter,Route,Switch,Redirect,BrowserRouter} from 'react-router-dom'
import Main from "./pages/Main"
import Login from "./pages/Login"
import Register from "./pages/Register"

ReactDOM.render(
    (
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route  component={Main}/>  {/*默认组件*/}
            </Switch>
        </HashRouter>
    ),
    document.getElementById('root'));

