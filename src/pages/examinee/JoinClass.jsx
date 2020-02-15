import React,{Component} from 'react'
import {Layout, Icon, List, Input,Descriptions} from "antd"

import PersonalMsg from "../../components/examinee/PersonalMsg"

const { Content, Sider } = Layout;
const { Search } = Input;
const listData = [];
for (let i = 0; i < 100; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `Aa36${i}`,
        description:
            '考试试卷描述.',
    });
}
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

export default class JoinClass extends Component{

    render() {
        return(
            <Layout className={'main-layout'} style={{marginTop:87}}>
                <Sider style={{backgroundColor:'#F0F2F5'}} width={350} className={'main-layout-sider'}>
                    <PersonalMsg/>
                </Sider>
                <Content style={{backgroundColor:'white',padding:20,paddingTop:0}}>
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
                        dataSource={listData}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                extra={
                                    <a>加入</a>
                                }
                            >
                                <Descriptions title={item.title} column={2}>
                                    <Descriptions.Item label="班主任">青园</Descriptions.Item>
                                    <Descriptions.Item label="人数">100</Descriptions.Item>
                                    <Descriptions.Item label="简介">111111111111111111111111111111111111</Descriptions.Item>
                                </Descriptions>
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>
        )
    }
}
