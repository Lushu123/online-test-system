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
                    <div style={{position:'relative'}} id={question.name}>
                        <span className={'question-number'}>{questionNumber}</span>
                        <span >{question.title}</span>
                    </div>

                }
                bordered={false}
            >
                <Radio.Group
                    style={{display:'flex',flexDirection:'column'}}
                    name={question.name}
                    options={question.options}
                    onChange={changeHandel}
                />
            </Card>
        )
    }
}
