import React,{Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {Icon, Layout, Menu,Input ,Breadcrumb} from "antd"

import AddQuestionToTestPaper from "./AddQuestionToTestPaper"
import AddTestPaper from "./AddTestPaper"
import PersonalCenter from "./PersonalCenter"
import QuestionEditor from "./QuestionEditor"
import TestPaperEditor from "./TestPaperEditor"
import NewBreadcrumb from "../../components/NewBreadcrumb"
import './style/adminMain.css'
const { Item,SubMenu  } = Menu;
const { Footer,Sider,Content,Header } = Layout;

const navArr = [
    {
        name:'考卷管理',
        key:'text',
        sunMenu:[
            {key:'/adminMain/test/testPaperEditor',icon:'read',title:'考卷编辑'},
            {key:'/adminMain/test/addTestPaper',icon:'solution',title:'新增考卷'},
            {key:'/adminMain/test/addQuestionToTestPaper',icon:'plus-circle',title:'添加考题'},
         ]
    },
    {
        name:'题库管理',
        key:'question',
        sunMenu:[
            {key:'/adminMain/question/questionEditor',icon:'search',title:'题目编辑'},
            {key:'/adminMain/question/personalCenter',icon:'user',title:'个人中心'},
        ]
    }

]
const routerArr = [
    {path:'/adminMain/test/testPaperEditor',component:TestPaperEditor},
    {path:'/adminMain/test/addTestPaper',component:AddTestPaper},
    {path:'/adminMain/test/addQuestionToTestPaper',component:AddQuestionToTestPaper},
    {path:'/adminMain/question/questionEditor',component:QuestionEditor},
    {path:'/adminMain/question/personalCenter',component:PersonalCenter},
]
export default class AdminMain extends Component{
    state = {
        current: '/adminMain/test/testPaperEditor',
        collapsed: false,
    };

    componentDidMount() {
        this.props.history.replace(this.state.current)
    }

    handleClick = e => {
        console.log('click ', e);
        this.props.history.replace(e.key)
        this.setState({
            current: e.key,
        });
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        const {current} = this.state
        return(
            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{color:'white',height:50}}>首页</Header>
                <Layout>
                    <Sider theme={'light'}   collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="inline"
                        >
                            <Item key={'home'}>
                                <Icon type={'home'} />
                                <span>{'首页'}</span>
                            </Item>
                            {
                                navArr.map(subNav => (
                                    <SubMenu key={subNav.key} title={subNav.name}>
                                        {
                                            subNav.sunMenu.map(nav => (
                                                <Item key={nav.key} >
                                                    <Icon type={nav.icon} />
                                                    <span>{nav.title}</span>
                                                </Item>
                                            ))
                                        }
                                    </SubMenu>

                                ))
                            }
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{backgroundColor:'#F0F2F5',padding:16,height:'fit-content'}}>
                            <NewBreadcrumb pathname={current}/>
                        </Header>
                        <Content   style={{
                            margin: '0 16px',
                            background: '#fff',
                            minHeight: 280,
                        }}
                        >
                            <Switch>
                                {
                                    routerArr.map(router => (
                                        <Route key={router.path} path={router.path} component={router.component}/>
                                    ))
                                }
                            </Switch>
                        </Content>


                        <Footer style={{ textAlign: 'center'}}
                                className={'footer'}>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>


            </Layout>
        )
    }
}
