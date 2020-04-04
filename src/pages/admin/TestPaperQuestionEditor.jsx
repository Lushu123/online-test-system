import React,{Component} from 'react'
import {Tabs,Layout,Icon,Button,Input,Popover } from 'antd'

import AddNewQuestionToTestPaper from "../../components/admin/AddNewQuestionToTestPaper"
import AddFromQuestionBank from "../../components/admin/AddFromQuestionBank"
import DeleteQuestionFormTestPaper from "../../components/admin/DeleteQuestionFormTestPaper"
import cookie from "js-cookie"
import {getQuestionsNotInTestPaperId,getQuestionsByTestPaperId,deleteFromTestPaper,addQuestionToTestPaperFromBank} from "../../api"
import QuestionTable from "../../components/admin/QuestionTable"
const { TabPane } = Tabs;
export default class TestPaperQuestionEditor extends Component{
    constructor(props){
        super(props)
        this.state = {
            notAddQuestionList:[],
            questionList:[],
            types:[],
            addLoading:false,
            deleteLoading:false,
        }
    }
    tabChange = (activeKey) => {
        const testPaperId = this.props.match.params.id
        const userId = cookie.get('userid')
        if(activeKey === '3'){
            this.setState({
                addLoading:true
            })
            getQuestionsNotInTestPaperId({testPaperId,userId})
                .then(res => {
                    const data = res.data
                    console.log(data)
                    this.setState({
                        notAddQuestionList:data.questionList,
                        types:data.types,
                         addLoading:false
                    })

                })
                .catch(function (error) {
                    console.log(error);
                    console.log("系统错误！")
                })
        }else if(activeKey === '2'){
            this.setState({
                deleteLoading:true
            })
            getQuestionsByTestPaperId({testPaperId})
                .then(res => {
                    const data = res.data
                    console.log(data)
                    this.setState({
                        questionList:data.questionList,
                        types:data.types,
                        deleteLoading:false
                    })

                })
                .catch(function (error) {
                    console.log(error);
                    console.log("系统错误！")
                })
        }

    }
    handleAdd = (text) =>{
        const testPaperId = this.props.match.params.id
        const questionId = text.key
        this.setState({
            addLoading:true
        })
        addQuestionToTestPaperFromBank({testPaperQuestion:{testPaperId,questionId},userId:cookie.get("userid")})
            .then(res => {
                const data = res.data
                console.log(data)
                this.setState({
                    notAddQuestionList:data.questionList,
                    types:data.types,
                    addLoading:false
                })
            })
            .catch(function (error) {
                console.log(error);
                console.log("系统错误！")
            })
    }
    handleDelete = (text) =>{
        const testPaperId = this.props.match.params.id
        const questionId = text.key
        this.setState({
            deleteLoading:true
        })
        deleteFromTestPaper({testPaperId,questionId})
            .then(res => {
                const data = res.data
                console.log(data)
                this.setState({
                    questionList:data.questionList,
                    types:data.types,
                    deleteLoading:false
                })

            })
            .catch(function (error) {
                console.log(error);
                console.log("系统错误！")
            })
    }
    render() {
        const {title,id} = this.props.match.params

        return(
            <Tabs
                defaultActiveKey="1"
                tabBarExtraContent={<div style={{marginRight:10}}>{title}</div>}
                className={'testPaper-question-editor'}
                onChange={(activeKey) => this.tabChange(activeKey)}
            >
                <TabPane tab="新增考题" key="1" style={{paddingBottom:10}}>
                    <AddNewQuestionToTestPaper id={id} />
                </TabPane>
                <TabPane tab="删除考题" key="2" >
                    <DeleteQuestionFormTestPaper
                        id={id}
                        questionList={this.state.questionList}
                        loading={this.state.deleteLoading}
                        handle={this.handleDelete}
                        types={this.state.types}
                    />
                </TabPane>
                <TabPane tab="添加已有考题" key="3">
                    <AddFromQuestionBank
                        id={id}
                        questionList={this.state.notAddQuestionList}
                        loading={this.state.addLoading}
                        handle={this.handleAdd}
                        types={this.state.types}
                    />
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
