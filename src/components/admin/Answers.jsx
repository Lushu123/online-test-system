import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {List,Typography} from 'antd'

export default class Answers extends Component{

    static propTypes = {
        answers:PropTypes.object.isRequired
    }
    render() {
        const {answers} = this.props
        return(
            <List>
                <List.Item>
                    <Typography.Text mark>{'A'}：</Typography.Text> {answers.answerA}
                </List.Item>
                <List.Item>
                    <Typography.Text mark>{'B'}：</Typography.Text> {answers.answerB}
                </List.Item>
                <List.Item>
                    <Typography.Text mark>{'C'}：</Typography.Text> {answers.answerC}
                </List.Item>
                <List.Item>
                    <Typography.Text mark>{'D'}：</Typography.Text> {answers.answerD}
                </List.Item>
            </List>
        )
    }
}
