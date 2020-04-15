import React,{Component} from 'react'
import {Layout, Icon, List, Input,Spin,Tooltip,Tag,Modal} from "antd"
import {getTestPaperNotTest} from "../../api"
import PersonalMsg from "../../components/examinee/PersonalMsg"
import moment from "moment"
import cookie from "js-cookie"
const { Content, Sider } = Layout;
const { Search } = Input;

const IconText = ({ type, text,tooltipTitle }) => (
    <span>
        <Tooltip title={tooltipTitle}>
          <Icon type={type} style={{ marginRight: 8 }} />
          {text}
        </Tooltip>
    </span>
);
export default class ExaminationPaperList extends Component{
    constructor(props){
        super(props)
        this.state = {
            testPaperList:[],
            loading:false,
        }
    }
    componentDidMount() {
        this.getTestPaperNotTestFun({userId:cookie.get('userid')})
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    enterTest = (testPaper) => {
        const isEnter = moment().diff(moment(testPaper.date),'minutes')
        if(isEnter > 15){
            Modal.warn({
                title: '已超过考试时间15分钟，不可进入！',
                okText: '确认',
                centered:true,
                onOk: () => {
                    this.getTestPaperNotTestFun({userId:cookie.get('userid')})
                }
            })
        }else if(isEnter < 0){
            Modal.warn({
                title: '未到考试时间，不可进入！',
                okText: '确认',
                centered:true,
            })
        }else {
            console.log(testPaper.id)
            this.props.history.push(`/examineeMain/examinationPage/${testPaper.id}`)
        }

    }
    onSearch = (search) => {
        this.getTestPaperNotTestFun({userId:cookie.get('userid'),search:search.trim()})
    }

    getTestPaperNotTestFun = ({userId,search=''}) =>{
        this.setState({
            loading:true
        })
        getTestPaperNotTest({userId,search})
            .then(res => {
                let data = res.data;
                console.log(data)
                this.setState({
                    testPaperList:data.testPaperList,
                    loading:false,
                })
            })
            .catch(error => {
                console.log(error)
                console.log('请求失败！')
            })
    }
    render() {
        const {testPaperList,loading} = this.state
        return(
            <Layout className={'main-layout'} style={{marginTop:87,minHeight:500}}>
                <Sider style={{backgroundColor:'#F0F2F5'}} width={350} className={'main-layout-sider'}>
                    <PersonalMsg {...this.props}/>
                </Sider>
                <Content style={{backgroundColor:'white',padding:20,paddingTop:0}}>
                    <Spin spinning={loading}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            header={
                                <Search
                                    className={'search'}
                                    placeholder="输入考卷名查询"
                                    onSearch={this.onSearch}
                                    style={{ width: 200 }}
                                />
                            }
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 10,
                            }}
                            dataSource={testPaperList}
                            renderItem={item => (
                                <List.Item
                                    key={item.id}
                                    actions={[
                                        <IconText type="calendar" text={item.date} tooltipTitle={"考试日期"} key="list-vertical-message" />,
                                        <IconText type="clock-circle" text={`${item.duration}分钟`} tooltipTitle={"考试时长"} key="list-vertical-star-o" />,
                                        <IconText type="smile" text={`${item.totalScore}分`} tooltipTitle={"总分"} key="list-vertical-like-o" />,
                                    ]}
                                    extra={ moment().diff(moment(item.date),'minutes')>15
                                        ? <Tag color="red">已关闭</Tag>
                                        : null}
                                >
                                    <List.Item.Meta
                                        title={
                                            <a
                                                style={moment().diff(moment(item.date),'minutes')>15
                                                    ? {cursor: 'notAllowed',pointerEvents:'none'}
                                                    : null}
                                                onClick={() => this.enterTest(item) }
                                            >
                                                {item.title}
                                            </a>}
                                        description={item.describe}
                                    />

                                </List.Item>
                            )}
                        />
                    </Spin>

                </Content>
            </Layout>
        )
    }
}
