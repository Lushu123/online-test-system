import React,{Component} from 'react'
import {Layout, Icon, List, Input} from "antd"

import PersonalMsg from "../../components/examinee/PersonalMsg"

const { Content, Sider } = Layout;
const { Search } = Input;
const listData = [];
for (let i = 0; i < 100; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `考试试卷 ${i}`,
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

export default class MyExamination extends Component{

    render() {
        return(
            <Layout className={'main-layout'} style={{marginTop:87}}>
                <Sider style={{backgroundColor:'#F0F2F5'}} width={350} className={'main-layout-sider'}>
                    <PersonalMsg {...this.props}/>
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
                                actions={[
                                    <IconText type="clock-circle" text="90min" key="list-vertical-star-o" />,
                                    <IconText type="smile" text="100" key="list-vertical-like-o" />,
                                    <IconText type="calendar" text="2018-07-08 9:00~10:30" key="list-vertical-message" />,
                                ]}
                                extra={'班级'}
                            >
                                <List.Item.Meta
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>
        )
    }
}
