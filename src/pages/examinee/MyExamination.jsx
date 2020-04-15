import React,{Component} from 'react'
import {Layout, Icon, List, Input, Spin, Descriptions} from "antd"

import PersonalMsg from "../../components/examinee/PersonalMsg"
import {getTestPapersForExaminee} from "../../api"
import cookie from "js-cookie"

const { Content, Sider } = Layout;
const { Search } = Input;
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

export default class MyExamination extends Component{
    constructor(props){
        super(props)
        this.state = {
            testPaperList:[],
            loading:false,
        }
    }
    componentDidMount() {
        this.getTestPapersForExamineeFun({userId:cookie.get('userid')})
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    onSearch = (search) => {
        this.getTestPapersForExamineeFun({userId:cookie.get('userid'),search:search.trim()})
    }
    getTestPapersForExamineeFun = ({userId,search=''}) => {
        this.setState({
            loading:true
        })
        getTestPapersForExaminee({userId,search})
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
                            header={<Search
                                className={'search'}
                                placeholder="输入考卷名查询"
                                onSearch={this.onSearch}
                                style={{ width: 200 }}
                            />}
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 10,
                            }}
                            dataSource={testPaperList}
                            renderItem={item => (
                                <List.Item
                                    key={item.title}
                                >
                                    <Descriptions title={item.title}>
                                        <Descriptions.Item label="总分">{item.totalScore}</Descriptions.Item>
                                        <Descriptions.Item label="成绩">{item.score}</Descriptions.Item>
                                    </Descriptions>
                                </List.Item>
                            )}
                        />
                    </Spin>
                </Content>
            </Layout>
        )
    }
}
