import React,{Component} from 'react'
import {Button} from "antd"
import QuestionTable from "./QuestionTable"


export default class DeleteQuestionFormTestPaper extends Component{


    renderOperation = (text) =>{
        return (
            <Button size="small" type={'danger'} onClick={() => this.props.handle(text)}>
                删除
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
                isShowHead={true}
            />
        )
    }
}
