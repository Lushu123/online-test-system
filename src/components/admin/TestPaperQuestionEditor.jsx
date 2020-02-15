import React,{Component} from 'react'
import { Tabs,Form } from 'antd';
import PropTypes from 'prop-types'

const { TabPane } = Tabs;
export default class TestPaperQuestionEditor extends Component{
    static propTypes = {
        id:PropTypes.number.isRequired,
        name:PropTypes.string.isRequired
    }
    render() {
        const {name,id} = this.props
        return(
            <Tabs defaultActiveKey="1" tabBarExtraContent={<div style={{marginRight:10}}>{name}</div>}>
                <TabPane tab="新增题目" key="1">
                    Content of Tab Pane 1
                </TabPane>
                <TabPane tab="添加已有题目" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="删除题目" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        )
    }
}
