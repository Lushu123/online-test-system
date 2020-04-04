import React,{Component} from 'react'
import QuestionTable from "../../components/admin/QuestionTable"
import {Button, Modal} from "antd"
import cookie from "js-cookie"
import {getQuestions, deleteQuestion, removeTestPaper} from "../../api"

export default class QuestionEditor extends Component{
    constructor(props){
        super(props)
        this.state = {
            questionList:[],
            types:[],
            loading:true
        }
    }
    componentDidMount() {
        const userId = cookie.get('userid')
        getQuestions({userId})
            .then(res => {
                const data = res.data
                console.log(data)
                this.setState({
                    questionList:data.questionList,
                    types:data.types,
                    loading:false
                })

            })
            .catch(function (error) {
                console.log(error);
                console.log("系统错误！")
            })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;

        }
    }
    renderOperation = (text) =>{
        return (
            <div>
                <Button.Group>
                    <Button size="small" type="danger" onClick={() => this.deleteQuestion(text)}>删除</Button>
                    <Button size="small" type="primary" onClick={() => this.updateQuestion(text)}>修改</Button>
                </Button.Group>
            </div>
        )

    }
    deleteQuestion = (text) =>{

        Modal.confirm({
            title: '请确认是否删除',
            content:'删除后相应考卷内的该考题也将删除，请确保该考题没有添加至任何考卷！',
            okText: '确认',
            cancelText: '取消',
            centered:true,
            onOk:() => {
                this.setState({
                    loading:true
                })
                deleteQuestion({questionId:text.key,userId:cookie.get('userid')})
                    .then(res => {
                        const data = res.data
                        console.log(data)
                        this.setState({
                            questionList:data.questionList,
                            types:data.types,
                            loading:false
                        })

                    })
                    .catch(function (error) {
                        console.log(error);
                        console.log("系统错误！")
                    })
            }
        });

    }
    updateQuestion = (text) =>{
        console.log(text)
    }
    render() {
        return(
            <QuestionTable
                renderOperation={this.renderOperation}
                questionList={this.state.questionList}
                loading={this.state.loading}
                types={this.state.types}
            />
        )
    }
}
//题库考题编辑
