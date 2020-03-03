import React,{Component} from 'react'
import { Calendar } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

export default class Home extends Component{
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
                <Calendar dateCellRender={this.dateCellRender} onPanelChange={this.onPanelChange} locale={moment.locale('zh-cn')} />
            </div>
        )
    }
}
