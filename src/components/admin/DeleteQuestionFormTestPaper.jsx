import React,{Component} from 'react'
import {Button} from "antd"
import QuestionTable from "./QuestionTable"


export default class DeleteQuestionFormTestPaper extends Component{


    renderOperation = (text) =>{
        return (
            <Button size="small" type={'danger'} onClick={() => this.handle(text,this.props.id)}>
                删除
            </Button>
        )

    }
    handle = (text,id) =>{
        console.log(text)
        console.log(id)
    }
    render() {
        return(
            <QuestionTable renderOperation={this.renderOperation}/>
        )
    }
}
