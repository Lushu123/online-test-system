import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {List,Typography} from 'antd'

export default class Answers extends Component{

    static propTypes = {
        answers:PropTypes.array.isRequired
    }
    render() {
        return(
            <List
                dataSource={this.props.answers}
                renderItem={item => (
                    <List.Item>
                        <Typography.Text mark>{item.option}：</Typography.Text> {item.answer}
                    </List.Item>
                )}
            />
        )
    }
}
