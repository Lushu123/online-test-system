import React,{Component} from 'react'
import {Table, Divider, Tag, Layout,Button} from 'antd'
import './style/testPaperEditor.css'

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `试卷${i}`,
        time: `120`,
        date: '2020-02-02',
        score: `100`,
        questionNum: `150题`,
        describe: `这是试卷1111111111111111111111111111111111111111111111111111111111111111 ${i}`,
    });
}
const {Content,Sider} = Layout
export default class TestPaperEditor extends Component{
    constructor(props){
        super(props);
        this.columns = [
            {
                title: '试卷名',
                dataIndex: 'name',
                key: 'name',
                align:'center',
            },
            {
                title: '考试时长',
                dataIndex: 'time',
                key: 'time',
                align:'center',
            },
            {
                title: '考试时间',
                dataIndex: 'date',
                key: 'date',
                align:'center',
            },
            {
                title: '总分数',
                key: 'score',
                dataIndex: 'score',
                align:'center',
            },
            {
                title: '总题数',
                key: 'questionNum',
                dataIndex: 'questionNum',
                align:'center',
            },
            {
                title: '操作',
                key: 'x',
                align:'center',
                render: (text, record, index) => (
                    <div>
                        <Button size="small" style={{marginRight:5}} onClick={() => this.addQuestion({id:text.key,name:text.name})}>
                            考题编辑
                        </Button>
                        <Button.Group>
                            <Button size="small" type="primary">发布</Button>
                            <Button size="small" type="danger">撤回</Button>
                        </Button.Group>
                        <Button.Group  style={{marginTop:5}}>
                            <Button size="small" type="danger" onClick={() => this.deleteTestPaper(text)}>删除</Button>
                            <Button size="small" type="primary" onClick={() => this.updateTestPaper(text)}>修改</Button>
                        </Button.Group>
                    </div>

                ),
            }
        ];
    }
    addQuestion = (params) =>{
        this.props.history.push({
            pathname: `/adminMain/test/testPaperQuestionEditor/${params.name}/${params.id}`,
        })
    }
    updateTestPaper = (state) =>{
        this.props.history.push({
            pathname: `/adminMain/test/updateTestPaper`,
            state
        })
    }

    deleteTestPaper = (text) => {
        console.log(text);

}
    render() {
        return(
            <>
                    <Table
                        className={'test-paper-editor-table'}
                        columns={this.columns}
                        dataSource={data}
                        pagination={{ pageSize:10 }}
                        scroll={{ y: 400 }}
                        expandedRowRender={record => <p style={{ margin: 0 }}>{record.describe}</p>}
                    />
             </>

        )
    }
}
//考卷多个操作的入口
//1、考卷的删除；2、考卷基本信息的修改；3、考卷发布（考生界面可见）；4、考卷撤回（考生界面不可见）；5、考卷题库编辑
