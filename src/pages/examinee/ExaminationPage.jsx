import React,{Component} from 'react'
import {Row,Col,List,Descriptions   } from 'antd'
import {getQuestionsByTestPaperId} from "../../api"
import InformationTip from "../../components/examinee/InformationTip"
import ChoiceQuestion from "../../components/examinee/ChoiceQuestion"

import './style/examinationPage.css'

const data = [];
for (let i = 0; i < 30; i++) {
    data.push({
        title: `第${i+1}题`,
        name: `${i+1}`,
        options:[
            {label:'A：Apple', value:'a'},
            {label:'B:Pear', value:'b'},
            {label:'C:Orange', value:'c'},
            {label:'D:Banana', value:'d'},
        ],
    });
}
const isChoiceArr = {}
for (let i = 0; i < data.length; i++) {
    isChoiceArr[data[i].name] = {isChoice:false}
}
export default class ExaminationPage extends Component{
    state = {
        isChoiceArr:isChoiceArr,
        questionList:[],
        testPaper:{},
    };
    componentDidMount() {
        const testPaperId = this.props.match.params.id
        getQuestionsByTestPaperId({testPaperId})
            .then(res => {
                console.log(res.data)
                let data = res.data
                this.setState({
                    questionList:data.questionList,
                    testPaper:data.testPaper,
                })
            })
            .catch(error => {
                console.log(error)
                console.log("系统错误！")
            })

    }


    onChange1 = e => {
        console.log('radio1 checked', e.target.value);
        this.setState(state => {
            return {isChoiceArr:Object.assign(state.isChoiceArr,{[e.target.name]:{isChoice:true}})}
        })
    };

    render() {
        const {isChoiceArr,questionList,testPaper} = this.state
        return(
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
                                    changeHandel={this.onChange1}
                                />
                            )}
                            className={'test-paper-list'}
                        />
                    </Col>
                    <Col span={5} offset={1} className={'test-paper-content-sider'}>
                        <InformationTip isChoiceArr={isChoiceArr}/>
                    </Col>
                </Row>
            </div>
        )

    }
}
