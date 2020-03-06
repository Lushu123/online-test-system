import React,{Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {autoLogin} from "../api"
import cookie from 'js-cookie'

import './style/main.css'
import ExamineeMain from "./examinee/ExamineeMain"
import AdminMain from "./admin/AdminMain"
import PubSub from 'pubsub-js'
export default class Main extends Component{
    state = {
        user:{},
    };
    componentDidMount() {
        const userid = cookie.get('userid')
        let _this = this
        const {user} = this.state
        if(userid && !user.id){
            autoLogin({id:userid})
                .then(function (response) {
                    let data = response.data
                    _this.setState({user:data})
                })
                .catch(function (error) {
                    console.log(error);
                    console.log("系统错误！")
                });
        }
    }

    render() {
        const {user} = this.state
        const userid = cookie.get('userid')
        if(!userid){
            return <Redirect to={'/login'}/>
        }
        if(!user.id){
            return null
        }else {
            if(this.props.location.pathname === '/'){
                if(user.permissions === 1 ){
                    console.log('a')
                    return <Redirect to={'/adminMain'}/>
                }else {
                    console.log(1)
                    return <Redirect to={'/examineeMain'}/>
                }
            }
        }
        return(
            <Switch>
                <Route path='/examineeMain' component={ExamineeMain}/>
                <Route path='/adminMain' component={AdminMain}/>
            </Switch>
        )
    }
}
