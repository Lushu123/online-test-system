import React,{Component} from 'react'
import {Tabs,Layout,Icon,Button,Input,Popover } from 'antd'

import AddNewQuestionToTestPaper from "../../components/admin/AddNewQuestionToTestPaper"
import AddFromQuestionBank from "../../components/admin/AddFromQuestionBank"
import DeleteQuestionFormTestPaper from "../../components/admin/DeleteQuestionFormTestPaper"
const { TabPane } = Tabs;
const {Content} = Layout

const { Search } = Input;
export default class TestPaperQuestionEditor extends Component{

    render() {
        const {name,id} = this.props.match.params

        return(
            <Tabs defaultActiveKey="1" tabBarExtraContent={<div style={{marginRight:10}}>{name}</div>}>
                <TabPane tab="新增考题" key="1" style={{paddingBottom:10}}>
                    <AddNewQuestionToTestPaper id={id}/>
                </TabPane>
                <TabPane tab="删除考题" key="2" >
                    <DeleteQuestionFormTestPaper id={id}/>
                </TabPane>
                <TabPane tab="添加已有考题" key="3">
                    <AddFromQuestionBank id={id}/>
                </TabPane>

            </Tabs>

        )
    }
}
/*
    1、添加考题到考卷
        从题库直接添加（AddFromQuestionBank）
        新增考题到考卷（同时添加到考卷和题库）（AddNewQuestionToTestPaper）
    2、从考卷删除考题 （DeleteQuestionFormTestPaper）
*/
