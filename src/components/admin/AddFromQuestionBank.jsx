import React,{Component} from 'react'
import {Button} from "antd"
import QuestionTable from "./QuestionTable"
import cookie from "js-cookie"
import {getQuestions} from "../../api"

export default class AddFromQuestionBank extends Component{

    renderOperation = (text) =>{
        return (
            <Button size="small" type={'primary'} onClick={() => this.props.handle(text)}>
                添加
            </Button>
        )

    }

    render() {
        return(
            <QuestionTable
                renderOperation={this.renderOperation}
                questionList={this.props.questionList}
                loading={this.props.loading}
                types={this.props.types}
            />
        )
    }
}
