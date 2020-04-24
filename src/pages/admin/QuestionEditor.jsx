import React,{Component} from 'react'
import QuestionTable from "../../components/admin/QuestionTable"
import {Button, Modal,Upload,Icon,message} from "antd"
import cookie from "js-cookie"
import {getQuestions, deleteQuestion, addQuestionFromExcel} from "../../api"
const ButtonGroup = Button.Group;

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
    uploadOption = () => ({
        name: 'file',
        action: '/question/addQuestionFromExcel',
        data:{userId:cookie.get('userid')},
        method:'post',
        onChange:(info) => {
            this.setState({
                loading:true
            })
            if (info.file.status !== 'uploading') {
                this.setState({
                    loading:false
                })
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                console.log(info)
                let fileListLength = info.fileList.length-1
                let data = info.fileList[fileListLength].response
                if(data.code === 1){
                    this.setState({
                        questionList:data.questionList,
                        types:data.types,
                        loading:false
                    })
                    message.success(`添加成功！`);
                }

            } else if (info.file.status === 'error') {
                message.error(`添加失败！`);
            }
        },
    })
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
        const questionJsonStr = JSON.stringify(text)
        this.props.history.replace(`/adminMain/question/updateQuestion/${questionJsonStr}`)
    }
    render() {
        return(
            <QuestionTable
                renderOperation={this.renderOperation}
                questionList={this.state.questionList}
                loading={this.state.loading}
                types={this.state.types}
                header={() => (
                    <div style={{textAlign:"right",marginRight:8}}>
                        <Upload {...this.uploadOption()}>
                            <Button type={'primary'}>批量添加</Button>
                        </Upload>
                    </div>
                )}
            />
        )
    }
}
//题库考题编辑
