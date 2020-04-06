import React,{Component} from 'react'
import { Calendar } from 'antd';
import moment from 'moment';
import {Route,Switch,Redirect} from 'react-router-dom'
import 'moment/locale/zh-cn';
import UserContext from "../../context/UserContext"
export default class Home extends Component{
    static contextType = UserContext;
    componentDidMount() {

    }

    onPanelChange = (value, mode) =>{
        console.log(value, mode);
    }
    dateCellRender = (moment) =>{
        if(moment.date() === 8){
            return (
                <div>
                    高数考试
                </div>
            )
        }
        return (
            <div>
            </div>
        )
    }
    render() {
        console.log(this.context)
        if(this.context.permissions === 0){
            return <Redirect to={'/'}/>
        }
        return(
            <div style={{maxHeight:500,overflow:'auto'}}>
                {/*<Calendar */}
                {/*    dateCellRender={this.dateCellRender}*/}
                {/*    onPanelChange={this.onPanelChange}*/}
                {/*    locale={moment.locale('zh-cn')}*/}
                {/*/>*/}
            </div>
        )
    }
}
