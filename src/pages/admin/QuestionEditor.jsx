import React,{Component} from 'react'
import QuestionTable from "../../components/admin/QuestionTable"
import {Button} from "antd"
import cookie from "js-cookie"
import {getQuestions} from "../../api"

export default class QuestionEditor extends Component{
    constructor(props){
        super(props)
        this.state = {
            questionList:[],
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
        console.log(text)
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
            />
        )
    }
}
//题库考题编辑
