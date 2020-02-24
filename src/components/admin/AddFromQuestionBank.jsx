import React,{Component} from 'react'
import {Button} from "antd"
import QuestionTable from "./QuestionTable"

export default class AddFromQuestionBank extends Component{
    renderOperation = (text) =>{
        return (
            <Button size="small" type={'primary'} onClick={() => this.handle(text,this.props.id)}>
                添加
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
