import React,{Component} from 'react'
import {Table, Divider, Tag, Layout,Button} from 'antd'

import TestPaperEditorPanel from "../../components/admin/TestPaperEditorPanel"
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
            },
            {
                title: '考试时长',
                dataIndex: 'time',
                key: 'time',
            },
            {
                title: '考试时间',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: '总分数',
                key: 'score',
                dataIndex: 'score',
            },
            {
                title: '总题数',
                key: 'questionNum',
                dataIndex: 'questionNum',
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (text, record, index) => (
                    <Button.Group>
                        <Button type="danger" onClick={() => this.onChange(text)}>删除</Button>
                        <Button type="primary">修改</Button>
                    </Button.Group>
                ),
            }
        ];
    }

    onChange = (text) => {
        console.log(text);

}
    render() {
        return(
            <>
                    <Table
                        className={'test-paper-editor-table'}
                        columns={this.columns}
                        dataSource={data}
                        pagination={{ pageSize: 7 }}
                        expandedRowRender={record => <p style={{ margin: 0 }}>{record.describe}</p>}
                    />

                    {/*<TestPaperEditorPanel curTestPaper={curTestPaper}/>*/}
             </>

        )
    }
}
