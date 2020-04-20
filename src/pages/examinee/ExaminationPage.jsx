import React,{Component} from 'react'
import {Row, Col, List, Descriptions, Spin, Modal} from 'antd'
import {Prompt} from 'react-router-dom'
import {getQuestionsByTestPaperId, handInTestPaper, login} from "../../api"
import InformationTip from "../../components/examinee/InformationTip"
import ChoiceQuestion from "../../components/examinee/ChoiceQuestion"

import './style/examinationPage.css'
import cookie from "js-cookie"

export default class ExaminationPage extends Component{
    state = {
        isChoiceArr:{},
        questionList:[],
        answerList:{},
        testPaper:{},
        duration:1,
        loading:true,
        isOpen:true,
    };
    componentDidMount() {
        const testPaperId = this.props.match.params.id
        getQuestionsByTestPaperId({testPaperId})
            .then(res => {
                console.log(res.data)
                let data = res.data
                const questionList = data.questionList
                const testPaper = data.testPaper
                let isChoiceArr = questionList.reduce((result,cur) => Object.assign(result,{[cur.key]:{isChoice:false}}),{})
                this.setState({
                    questionList,
                    testPaper,
                    isChoiceArr,
                    duration:testPaper.duration * 60,
                    loading:false,
                })
            })
            .catch(error => {
                console.log(error)
                console.log("系统错误！")
            })

        const timeDown = setInterval(() => {
            if(this.state.duration !== 0){
                this.setState(state => {
                    return {duration:state.duration-1}
                })
            }else {
                this.setState({
                    isOpen:false
                })

                Modal.info({
                    title: '考试已结束，自动交卷！',
                    okText: '确认',
                    centered:true,
                    onOk: () => {
                        this.handInTestPaperAjax()
                    }
                });
                console.log('考试结束')
                clearInterval(timeDown)
            }

        },1000)

    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }

    timeDownParse = (duration) => {
        const minutes = Math.floor(duration/60)
        const seconds = duration%60
        return `${minutes}:${seconds<10 ? `0${seconds}` : seconds}`
    }
    questionAnswerChange = (e) => {
        const answer = e.target.value;
        this.setState(state => {
            return {
                isChoiceArr:Object.assign(state.isChoiceArr,{[e.target.name]:{isChoice:true}}),
                answerList:Object.assign(state.answerList,{[e.target.name]:answer}),
            }
        })
    };
    handInPaper = () =>{
        Modal.confirm({
            title: '请确认是否交卷？',
            okText: '确认',
            cancelText: '取消',
            centered:true,
            onOk: () => {
                this.setState({
                    isOpen:false
                })
                this.handInTestPaperAjax()
            }
        })
    }
    handInTestPaperAjax = () => {
        const {answerList,questionList} = this.state
        const totalScore = questionList.reduce((total,cur) => {
            if(cur.realAnswer === answerList[cur.key]){
                return total + cur.score
            }else{
                return total
            }
        },0);
        console.log(totalScore)
        const testPaperId = this.props.match.params.id
        handInTestPaper({testPaperId,userId:cookie.get('userid'),score:totalScore}).then(res => {
            console.log(res.data)
            if(res.data.code === 1){
                this.props.history.replace(`/`)
            }
        }).catch(error => {
            console.log(error)
        })
    }
    render() {
        const {isChoiceArr,questionList,testPaper,loading,duration,isOpen} = this.state
        return(
            <Spin spinning={loading}>
                <Prompt message = {(location)=>{
                        let leave = window.confirm("您确定要离开该页面吗?")
                        if(leave) {
                            this.handInTestPaperAjax()
                            return true
                        }else {
                            return false
                        }
                }} when={isOpen}/>
                <div>
                    <Row>
                        <Col className={'test-paper-header'} span={18} offset={3}>
                            <Descriptions title={testPaper.title}>
                                <Descriptions.Item label="考试时间">{`${testPaper.duration}分钟`}</Descriptions.Item>
                                <Descriptions.Item label="总题数">{`${testPaper.questionNum}题`}</Descriptions.Item>
                                <Descriptions.Item label="总分数">{`${testPaper.totalScore}分`}</Descriptions.Item>
                                <Descriptions.Item label="描述" span={3}>
                                    {testPaper.describe}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Row className={'test-paper-main'} type={'flex'}>
                        <Col span={12} offset={3}  className={'test-paper-content'}>
                            <List
                                size="large"
                                dataSource={questionList}
                                renderItem={(item,index) => (
                                    <ChoiceQuestion
                                        key={index}
                                        question={item}
                                        questionNumber={index+1}
                                        changeHandel={this.questionAnswerChange}
                                    />
                                )}
                                className={'test-paper-list'}
                            />
                        </Col>
                        <Col span={5} offset={1} className={'test-paper-content-sider'}>
                            <InformationTip
                                isChoiceArr={isChoiceArr}
                                handInPaper={this.handInPaper}
                                duration={this.timeDownParse(duration)}
                            />
                        </Col>
                    </Row>
                </div>
            </Spin>

        )

    }
}
