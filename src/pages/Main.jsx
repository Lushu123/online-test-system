import React,{Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'

import ExamineeMain from "./examinee/ExamineeMain"
import AdminMain from "./admin/AdminMain"
import './style/main.css'
export default class Main extends Component{
    componentDidMount() {
    }

    render() {
        if(this.props.location.pathname === '/'){
            return <Redirect to={'/adminMain'}/>
        }
        return(
            <Switch>
                <Route path='/examineeMain' component={ExamineeMain}/>
                <Route path='/adminMain' component={AdminMain}/>
            </Switch>
        )
    }
}
