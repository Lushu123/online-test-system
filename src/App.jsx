import React,{Component} from 'react'
import {HashRouter,Route,Switch,Redirect,BrowserRouter} from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Main from "./pages/Main"


export default class App extends Component{

    render() {
        return(
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route  component={Main}/>  {/*默认组件*/}
            </Switch>
        )
    }
}
