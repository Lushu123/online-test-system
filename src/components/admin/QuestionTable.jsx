import React,{Component} from 'react'
import {Button, Icon, Input, Table} from "antd"
import Answers from "./Answers"
import PropTypes from 'prop-types'
import getColumnSearchProps from '../../utils/getColumnSearchProps'
import '../style/QuestionTable.css'


const ButtonGroup = Button.Group;
export default class QuestionTable extends Component{

    constructor(props){
        super(props)
        this.state = {
            searchText: '',
            searchedColumn: '',
        }
    }
    static propTypes = {
        questionList:PropTypes.array.isRequired
    }
    getColumns = () =>  [
        {
            title: '题干',
            dataIndex: 'questionStem',
            key: 'questionStem',
            align:'center',
            ...getColumnSearchProps('questionStem',this),
        },
        {
            title: '正确答案',
            dataIndex: 'realAnswer',
            key: 'realAnswer',
            align:'center',
            filters:[
                {
                    text: 'A',
                    value: 'A',
                },
                {
                    text: 'B',
                    value: 'B',
                },
                {
                    text: 'C',
                    value: 'C',
                },
                {
                    text: 'D',
                    value: 'D',
                },
            ],
            onFilter: (value, record) => record.realAnswer.indexOf(value) === 0,
        },
        {
            title: '分值',
            key: 'score',
            dataIndex: 'score',
            align:'center',
            sorter: (a, b) => a.score - b.score,
        },
        {
            title: '类型',
            key: 'type',
            dataIndex: 'type',
            align:'center',
            filters:this.getTypes(),
            onFilter: (value, record) => record.type.indexOf(value) === 0,
        },
        {
            title: '操作',
            key: 'operation',
            align:'center',
            render: this.props.renderOperation,
        }
    ]
    getTypes = () => {
        return this.props.types.map(item => (
                {
                    text: item.toUpperCase(),
                    value: item,
                }
            )
        );

    }
    render() {
        const {questionList,loading,isShowHead} = this.props
        const questionNum = questionList.length
        console.log(questionList)
        const totalScore = questionList.reduce((totalScore,curScore) => totalScore+curScore.score,0 )
        return(
            <>
                <Table
                    title={isShowHead ? () => (
                            <div style={{textAlign:"right",marginRight:8}}>
                                <ButtonGroup style={{marginRight:5}}>
                                    <Button type="primary" >总题数</Button>
                                    <Button type="primary" disabled  style={{color:'black'}}>{questionNum}</Button>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button type="primary">总分数</Button>
                                    <Button type="primary" disabled style={{color:'black'}}>{totalScore}</Button>
                                </ButtonGroup>
                            </div>
                        )
                        : null}
                    loading={loading}
                    className={'test-paper-editor-table'}
                    columns={this.getColumns()}
                    dataSource={questionList}
                    pagination={{ pageSize:10 }}
                    scroll={{ y: isShowHead ? 325 : 370 }}
                    expandedRowRender={record => <Answers answers={record.answers}/>}
                />
            </>
        )
    }
}
