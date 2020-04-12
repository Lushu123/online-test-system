import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Card, Radio,Badge } from "antd"

import '../style/choiceQuestion.css'
export default class ChoiceQuestion extends Component{
    static propTypes = {
        changeHandel:PropTypes.func,
        question:PropTypes.object.isRequired,
        questionNumber:PropTypes.number
    }

    render() {
        const {question,changeHandel,questionNumber} = this.props
        return(
            <Card
                className={'choice-question'}
                title={
                    <div style={{position:'relative'}} id={question.key}>
                        <span className={'question-number'}>{questionNumber}</span>
                        <span >{question.questionStem}</span>
                    </div>

                }
                bordered={false}
            >
                <Radio.Group
                    style={{display:'flex',flexDirection:'column'}}
                    name={`${question.key}`}
                    onChange={changeHandel}
                >
                    <Radio value="A">{question.answers.answerA}</Radio>
                    <Radio value="B">{question.answers.answerB}</Radio>
                    <Radio value="C">{question.answers.answerC}</Radio>
                    <Radio value="D">{question.answers.answerD}</Radio>
                </Radio.Group>
            </Card>
        )
    }
}
