import React,{Component} from 'react'
import { Typography  } from 'antd';
import moment from 'moment';
import {Route,Switch,Redirect} from 'react-router-dom'
import 'moment/locale/zh-cn';
import UserContext from "../../context/UserContext"

const { Title } = Typography;
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
        return(
            <div style={{maxHeight:500,overflow:'auto'}}>
                <Title level={2} style={{marginTop:10,marginLeft:10}}>欢迎使用本系统</Title>
            </div>
        )
    }
}
