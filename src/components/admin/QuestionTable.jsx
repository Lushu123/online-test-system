import React,{Component} from 'react'
import {Button, Table} from "antd"
import Answers from "./Answers"
import PropTypes from 'prop-types'
import '../style/testPaperEditorPanel.css'
const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        questionName: `在创建对象时必须（）${i}`,
        answers:[
            {answer: `先声明对象，然后才能使用对象${i}`,option:'A'},
            {answer: `先声明对象，为对象分配内存空间，然后才能使用对象${i}`,option:'B'},
            {answer: `先声明对象，为对象分配内存空间，对对象初始化，然后才能使用对象${i}`,option:'C'},
            {answer: `上述说法都对 ${i}`,option:'D'},
        ],
        realAnswer: `D`,
        score:2,
        type:'选择题',
        knowledgeCategory:'JAVA',
    });
}

export default class QuestionTable extends Component{
    static propTypes = {
        renderOperation:PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.columns = [
            {
                title: '题干',
                dataIndex: 'questionName',
                key: 'questionName',
                align:'center',
            },
            {
                title: '正确答案',
                dataIndex: 'realAnswer',
                key: 'realAnswer',
                align:'center',
            },
            {
                title: '分值',
                key: 'score',
                dataIndex: 'score',
                align:'center',
            },
            {
                title: '类型',
                key: 'type',
                dataIndex: 'type',
                align:'center',
            },
            {
                title: '知识范畴',
                key: 'knowledgeCategory',
                dataIndex: 'knowledgeCategory',
                align:'center',
            },
            {
                title: '操作',
                key: 'operation',
                align:'center',
                render: props.renderOperation,
            }
        ];
    }

    render() {
        return(
            <>
                <Table
                    className={'test-paper-editor-table'}
                    columns={this.columns}
                    dataSource={data}
                    pagination={{ pageSize:10 }}
                    scroll={{ y: 370 }}
                    expandedRowRender={record => <Answers answers={record.answers}/>}
                />
            </>
        )
    }
}
