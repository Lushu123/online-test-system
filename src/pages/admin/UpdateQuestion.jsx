import React,{Component} from 'react'
import QuestionForm from "../../components/admin/QuestionForm"
import {updateQuestion} from '../../api/index'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {notification} from "antd"
import cookie from "js-cookie"
import moment from "moment"

export default class UpdateQuestion extends Component{
    state = {
        loading:false,
        updateData:JSON.parse(this.props.match.params.question)
    }
    handle = (question,form) => {
        Object.assign(question,{userId:cookie.get('userid'),id:JSON.parse(this.props.match.params.question).key});
        console.log(question)
        this.setState({
            loading:true
        })
        updateQuestion(question)
            .then(res => {
                const data = res.data
                const question = data.question
                if(data.code === 0){
                    notification.error({message:'添加失败！',duration:2})
                    this.setState({
                        loading:false,
                    })
                }else {
                    notification.info({message:'添加成功！',duration:2})

                    this.setState({
                        loading:false,
                        updateData:question
                    })
                }

            })
            .catch(error => {
            console.log(error);
            console.log("系统错误！")
        })


    };
    render() {
        return(
            <div style={{height:500,overflow:'auto'}}>
                <QuestionForm
                    handle={this.handle}
                    type={'update'}
                    loading={this.state.loading}
                    updateData={this.state.updateData}/>
            </div>

        )
    }
}
//新增考题（不添加到任何考卷）
