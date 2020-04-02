import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Main from "./pages/Main"
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
export default class App extends Component{

    render() {
        return(
            <ConfigProvider locale={zhCN}>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route  component={Main}/>  {/*默认组件*/}
            </Switch>
            </ConfigProvider>
        )
    }
}
