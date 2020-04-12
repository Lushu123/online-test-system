import React,{Component} from 'react'
import {Table, Input, Button, Icon,Modal } from 'antd'
import './style/testPaperEditor.css'
import {getTestPapersForAdmin,removeTestPaper,isRelease} from '../../api/index'
import cookie from "js-cookie"
import getColumnSearchProps from '../../utils/getColumnSearchProps'

export default class TestPaperEditor extends Component{
    constructor(props){
        super(props);
        this.columns = [
            {
                title: '试卷名',
                dataIndex: 'title',
                key: 'title',
                align:'center',
                ...getColumnSearchProps('title',this),
            },
            {
                title: '考试时间',
                dataIndex: 'date',
                key: 'date',
                align:'center',
            },
            {
                title: '考试时长',
                dataIndex: 'duration',
                key: 'duration',
                align:'center',
                sorter: (a, b) => a.duration - b.duration,
            },
            {
                title: '总分数',
                key: 'totalScore',
                dataIndex: 'totalScore',
                align:'center',
                sorter: (a, b) => a.totalScore - b.totalScore,

            },
            {
                title: '总题数',
                key: 'questionNum',
                dataIndex: 'questionNum',
                align:'center',
                sorter: (a, b) => a.questionNum - b.questionNum,
            },
            {
                title: '是否发布',
                key: 'isRelease',
                dataIndex: 'isRelease',
                align:'center',
                filters:[
                    {
                        text: '是',
                        value: '1',
                    },
                    {
                        text: '否',
                        value: '0',
                    },
                ],
                onFilter: (value, record) => record.isRelease.indexOf(value) === 0,
                render:(record) => (<span>
                    {record === "1" ? '是':'否'}
                </span>)
            },
            {
                title: '操作',
                key: 'operation',
                align:'center',
                render: (text, record, index) => (
                    <div>
                        <Button size="small" style={{marginRight:5}}
                                disabled={text.isRelease === '1'}
                                onClick={() => this.addQuestion({id:text.key,title:text.title})}>
                            考题编辑
                        </Button>
                        <Button.Group  style={{marginTop:5}}>
                            <Button
                                size="small"
                                type="primary"
                                disabled={text.isRelease === '1'}
                                onClick={() => this.isRelease({testPaperId: text.key,release:'1'})}
                            >发布</Button>
                            <Button
                                size="small"
                                type="danger"
                                disabled={text.isRelease === '0'}
                                onClick={() => this.isRelease({testPaperId: text.key,release:'0'})}
                            >撤回</Button>
                        </Button.Group>
                        <Button.Group  style={{marginTop:5}}>
                            <Button size="small" type="danger"
                                    disabled={text.isRelease === '1'}
                                    onClick={() => this.deleteTestPaper(text)}>删除</Button>
                            <Button size="small" type="primary"
                                    disabled={text.isRelease === '1'}
                                    onClick={() => this.updateTestPaper(text)}>修改</Button>
                        </Button.Group>
                    </div>

                ),
            }
        ];
        this.state = {
            testPaperList:[],
            userId:'',
            loading:true,
            searchText: '',
            searchedColumn: '',
        }
    }
    componentDidMount() {
        const userId = cookie.get('userid')
        getTestPapersForAdmin({userId}).then(res=> {
            const data = res.data
            const testPaperList = JSON.parse(JSON.stringify(data.testPaperList).replace(/id/g,"key"));
            const userId = data.userId;
            console.log(testPaperList)
            this.setState({
                testPaperList,
                userId,
                loading:false
            })

        }).catch(function (error) {
            console.log(error);
            console.log("系统错误！")
        })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;

        }
    }

    addQuestion = (testPaper) =>{
        console.log(testPaper)
        this.props.history.replace({
            pathname: `/adminMain/test/testPaperQuestionEditor/${testPaper.title}/${testPaper.id}`,
        })
    }
    updateTestPaper = (testPaper) =>{
        const testPaperJsonStr = JSON.stringify(testPaper)
        this.props.history.replace({
            pathname: `/adminMain/test/updateTestPaper/${testPaperJsonStr}`
        })
    }
    //是否发布考卷
    isRelease = (data) =>{

        this.setState({
            loading:true
        })
        isRelease({
            userTestPaper: {userId: this.state.userId, testPaperId: data.testPaperId},
            isRelease: data.release,
        }).then (res => {
            let data = res.data;
            if(data.code === 1){
                const testPaperList = JSON.parse(JSON.stringify(data.testPaperList).replace(/id/g,"key"));
                console.log(testPaperList)
                this.setState({
                    testPaperList,
                    loading:false
                })
            }else {
                this.setState({
                    loading:false
                })
            }
        })
    }
    //删除考卷
    deleteTestPaper = (text) => {
        console.log(text);
        Modal.confirm({
            title: '请确认是否删除！',
            okText: '确认',
            cancelText: '取消',
            centered:true,
            onOk:() => {
                this.setState({
                    loading:true
                })
                console.log(text.key,this.state)
                removeTestPaper({testPaperId:text.key,userId:this.state.userId})
                    .then(res => {
                        const data = res.data
                        if(data.code === 1){
                            const testPaperList = JSON.parse(JSON.stringify(data.testPaperList).replace(/id/g,"key"));
                            console.log(testPaperList)
                            this.setState({
                                testPaperList,
                                loading:false
                            })
                        }else {
                            console.log(data)
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                        console.log("系统错误！")
                    })
            }
        });
    }

    render() {
        return(
            <>
                    <Table
                        className={'test-paper-editor-table'}
                        columns={this.columns}
                        dataSource={this.state.testPaperList}
                        pagination={{ pageSize:10 }}
                        scroll={{ y: 400 }}
                        expandedRowRender={record => <p style={{ margin: 0 }}>{record.describe}</p>}
                        loading={this.state.loading}
                    />
             </>

        )
    }
}
//考卷多个操作的入口
//1、考卷的删除；2、考卷基本信息的修改；3、考卷发布（考生界面可见）；4、考卷撤回（考生界面不可见）；5、考卷题库编辑
