import React,{Component} from 'react'
import {Layout} from "antd"
import QuestionForm from "../../components/admin/QuestionForm"
const { Content } = Layout;
export default class AddQuestion extends Component{
    handle = () => {

    };
    render() {
        return(
            <QuestionForm handle={this.handle}/>
        )
    }
}
//新增考题（不添加到任何考卷）
