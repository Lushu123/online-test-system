import React,{Component} from 'react'
import {Button} from "antd"
import QuestionTable from "./QuestionTable"
const ButtonGroup = Button.Group;

export default class DeleteQuestionFormTestPaper extends Component{


    renderOperation = (text) =>{
        return (
            <Button size="small" type={'danger'} onClick={() => this.props.handle(text)}>
                删除
            </Button>
        )

    }
    render() {
        const {questionList,loading,types} = this.props
        return(
            <QuestionTable
                renderOperation={this.renderOperation}
                questionList={questionList}
                loading={loading}
                types={types}
                header={() => (
                    <div style={{textAlign:"right",marginRight:8}}>
                        <ButtonGroup style={{marginRight:5}}>
                            <Button type="primary" >总题数</Button>
                            <Button type="primary" disabled  style={{color:'black'}}>{questionList.length}</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button type="primary">总分数</Button>
                            <Button type="primary" disabled style={{color:'black'}}>{questionList.reduce((totalScore,curScore) => totalScore+curScore.score,0 )}</Button>
                        </ButtonGroup>
                    </div>
                )}
            />
        )
    }
}
