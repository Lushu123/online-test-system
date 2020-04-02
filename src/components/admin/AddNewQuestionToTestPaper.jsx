import React,{Component} from 'react'
import QuestionForm from "./QuestionForm"
import cookie from "js-cookie"
import {object} from "prop-types"
import {addQuestionToTestPaper} from '../../api/index'
import {notification} from "antd"

export default class AddNewQuestionToTestPaper extends Component{
    handle = (question,form) => {
        const userId = cookie.get('userid')
        const testPaperId = this.props.id
        Object.assign(question,{userId})
        addQuestionToTestPaper({question,testPaperId})
            .then((response) => {
                let data = response.data;
                if(data.code === 0){
                    notification.error({message:'添加失败！',duration:2})
                }else {
                    notification.info({message:'添加成功！',duration:2})
                    form.resetFields()
                }
                this.setState({
                    loading:false
                })
            })
            .catch(function (error) {
                console.log(error);
                console.log("系统错误！")
            });
    };

    render() {

        return(
            <QuestionForm handle={this.handle}/>
        )
    }
}


