import React,{Component} from 'react'
import QuestionTable from "../../components/admin/QuestionTable"
import {Button} from "antd"

export default class QuestionEditor extends Component{
    renderOperation = (text) =>{
        return (
            <div>
                <Button.Group>
                    <Button size="small" type="danger" onClick={() => this.deleteQuestion(text)}>删除</Button>
                    <Button size="small" type="primary" onClick={() => this.updateQuestion(text)}>修改</Button>
                </Button.Group>
            </div>
        )

    }
    deleteQuestion = (text) =>{
        console.log(text)
    }
    updateQuestion = (text) =>{
        console.log(text)
    }
    render() {
        return(
            <QuestionTable renderOperation={this.renderOperation}/>
        )
    }
}
//题库考题编辑
