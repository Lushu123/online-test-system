import React,{Component} from 'react'
import {Table, Input, Button, Icon,Modal } from 'antd'
import './style/testPaperEditor.css'
import {getTestPapers,removeTestPaper,isRelease} from '../../api/index'
import cookie from "js-cookie"


export default class TestPaperEditor extends Component{
    constructor(props){
        super(props);
        this.columns = [
            {
                title: '试卷名',
                dataIndex: 'title',
                key: 'title',
                align:'center',
                ...this.getColumnSearchProps('title'),
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
                title: '操作',
                key: 'operation',
                align:'center',
                render: (text, record, index) => (
                    <div>
                        <Button size="small" style={{marginRight:5}} onClick={() => this.addQuestion({id:text.key,name:text.name})}>
                            考题编辑
                        </Button>
                        <Button.Group>
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
                            <Button size="small" type="danger" onClick={() => this.deleteTestPaper(text)}>删除</Button>
                            <Button size="small" type="primary" onClick={() => this.updateTestPaper(text)}>修改</Button>
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
        getTestPapers({userId}).then(res=> {
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

    addQuestion = (testPaper) =>{
        this.props.history.push({
            pathname: `/adminMain/test/testPaperQuestionEditor/${testPaper.title}/${testPaper.key}`,
        })
    }
    updateTestPaper = (state) =>{
        this.props.history.push({
            pathname: `/adminMain/test/updateTestPaper`,
            state
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
    //自定义筛选考卷名
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`请输入考卷名称`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    搜索
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
    });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
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
