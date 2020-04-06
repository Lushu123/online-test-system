import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Main from "./pages/Main"
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import NoMatch from "./pages/NoMatch"
export default class App extends Component{
    state = {
        user:{},
    };
    render() {
        return(
            <ConfigProvider locale={zhCN}>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/404' component={NoMatch}/>
                <Route  component={Main}/>  {/*默认组件*/}
            </Switch>
            </ConfigProvider>
        )
    }
}
