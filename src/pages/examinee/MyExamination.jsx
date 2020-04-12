import React,{Component} from 'react'
import {Layout, Icon, List, Input, Spin} from "antd"

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
        this.setState({
            loading:true
        })
        getTestPapersForExaminee({userId:cookie.get('userid')})
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
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        const {testPaperList,loading} = this.state
        return(
            <Layout className={'main-layout'} style={{marginTop:87}}>
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
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
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
                                    key={item.id}
                                    actions={[
                                        <IconText type="clock-circle" text={`${item.duration}分钟`} key="list-vertical-star-o" />,
                                        <IconText type="smile" text={`${item.totalScore}分`} key="list-vertical-like-o" />,
                                        <IconText type="calendar" text={item.date} key="list-vertical-message" />,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={<a>{item.title}</a>}
                                        description={item.description}
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
