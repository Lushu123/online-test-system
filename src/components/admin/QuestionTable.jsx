import React,{Component} from 'react'
import {Button, Table} from "antd"
import Answers from "./Answers"
import PropTypes from 'prop-types'
import {getQuestions} from '../../api/index'
import '../style/testPaperEditorPanel.css'
import cookie from "js-cookie"
const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        questionName: `在创建对象时必须（）${i}`,
        answers:{
            answerA: `先声明对象，然后才能使用对象${i}`,
            answerB: `先声明对象，为对象分配内存空间，然后才能使用对象${i}`,
            answerC: `先声明对象，为对象分配内存空间，对对象初始化，然后才能使用对象${i}`,
            answerD: `上述说法都对 ${i}`,
        },
        realAnswer: `D`,
        score:2,
        type:'选择题',
        knowledgeCategory:'JAVA',
    });
}

export default class QuestionTable extends Component{

    constructor(props){
        super(props)
        this.columns = [
            {
                title: '题干',
                dataIndex: 'questionStem',
                key: 'questionStem',
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
                title: '操作',
                key: 'operation',
                align:'center',
                render: props.renderOperation,
            }
        ];
    }
    static propTypes = {
        questionList:PropTypes.array.isRequired
    }

    render() {
        const {questionList,loading} = this.props
        return(
            <>
                <Table
                    loading={loading}
                    className={'test-paper-editor-table'}
                    columns={this.columns}
                    dataSource={questionList}
                    pagination={{ pageSize:10 }}
                    scroll={{ y: 370 }}
                    expandedRowRender={record => <Answers answers={record.answers}/>}
                />
            </>
        )
    }
}
