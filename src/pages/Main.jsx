import React,{Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {autoLogin} from "../api"
import cookie from 'js-cookie'

import './style/main.css'
import ExamineeMain from "./examinee/ExamineeMain"
import AdminMain from "./admin/AdminMain"
import UserContext from "../context/UserContext"
import PubSub from 'pubsub-js'
import {notification} from "antd"
import NoMatch from "./NoMatch"

export default class Main extends Component{
    state = {
        user:{},
    };
    componentDidMount() {
        const userid = cookie.get('userid')
        let certification
        if(cookie.get('certification')){
            certification = JSON.parse(cookie.get('certification'))
            const {user} = this.state
            if(userid && !user.id){
                autoLogin({account:certification.a,password:certification.t})
                    .then( (response) =>{
                        let data = response.data
                        if(data.code === 1){
                            this.setState({user:data.user})
                            cookie.set('userid',data.user.id)
                        }else {
                            notification.error({message:'验证失败，请重新登陆！',duration:2})
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        console.log("系统错误！")
                    });
            }
        }


    }

    render() {
        const {user} = this.state
        delete user.password
        if(!cookie.get('userid') || !cookie.get('certification')){
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
                    return <Redirect to={'/examineeMain'}/>
                }
            }
        }
        return(
            <UserContext.Provider value={user}>
                <Switch>
                    <Route path='/examineeMain' component={ExamineeMain}/>
                    <Route path='/adminMain' component={AdminMain}/>
                    <Route path="*" component={NoMatch} />
                    <Redirect from='*' to='/404' />
                </Switch>
            </UserContext.Provider>

        )
    }
}
