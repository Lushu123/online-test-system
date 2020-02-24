import React,{Component} from 'react'
import QuestionForm from "./QuestionForm"

export default class AddNewQuestionToTestPaper extends Component{
    handle = (values,id) => {
        console.log(values)
        console.log(id)
    };
    render() {

        return(
            <QuestionForm handle={(values) => this.handle(values,this.props.id)}/>
        )
    }
}


