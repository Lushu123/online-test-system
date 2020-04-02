import React,{Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {Icon, Layout, Menu, Input, Breadcrumb, Avatar, Popover, Button} from "antd"

import TestPaperQuestionEditor from "./TestPaperQuestionEditor"
import AddTestPaper from "./AddTestPaper"
import AddQuestion from "./AddQuestion"
import QuestionEditor from "./QuestionEditor"
import TestPaperEditor from "./TestPaperEditor"
import NewBreadcrumb from "../../components/NewBreadcrumb"
import UpdateTestPaper from "./UpdateTestPaper"
import Home from "./Home"
import './style/adminMain.css'
import cookie from "js-cookie"
import UserContext from "../../context/UserContext"
const { Item,SubMenu  } = Menu;
const { Footer,Sider,Content,Header } = Layout;

const navArr = [
    {
        name:'考卷管理',
        key:'text',
        sunMenu:[
            {key:'/adminMain/test/testPaperEditor',icon:'read',title:'考卷编辑'},
            {key:'/adminMain/test/addTestPaper',icon:'solution',title:'新增考卷'},
         ]
    },
    {
        name:'题库管理',
        key:'question',
        sunMenu:[
            {key:'/adminMain/question/questionEditor',icon:'search',title:'题目编辑'},
            {key:'/adminMain/question/addQuestion',icon:'user',title:'新增考题'},
        ]
    }

]
const routerArr = [
    {path:'/adminMain/test/testPaperEditor',component:TestPaperEditor},
    {path:'/adminMain/test/addTestPaper',component:AddTestPaper},
    {path:'/adminMain/test/updateTestPaper',component:UpdateTestPaper},
    {path:'/adminMain/test/testPaperQuestionEditor/:title/:id',component:TestPaperQuestionEditor},
    {path:'/adminMain/question/questionEditor',component:QuestionEditor},
    {path:'/adminMain/question/addQuestion',component:AddQuestion},
    {path:'/adminMain/home',component:Home},
]
export default class AdminMain extends Component{
    static contextType = UserContext;
    state = {
        current: '/adminMain/home',
        collapsed: false,
        mainWidth: 200
    };

    componentDidMount() {
        this.props.history.replace(this.state.current)
        console.log(this.context)

    }

    handleClick = e => {
        console.log('click ', e);
        this.props.history.replace(e.key)
        this.setState({
            current: e.key,
        });
    };
    onCollapse = collapsed => {
        this.setState({ collapsed});
        if(collapsed){
            this.setState({mainWidth:80});
        }else {
            this.setState({mainWidth:200});
        }

    };
    logout = () => {
        cookie.remove('userid')
        this.props.history.replace('/')
    }
    render() {
        const {current,mainWidth} = this.state
        const user = this.context
        return(
            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{color:'white',position:'fixed',top:0,left:0,right:0,zIndex:999}} >
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span style={{fontWeight:'bold',fontSize:16}}>线上考试后台管理系统</span>
                        <div  className={'popover-btn'}>
                            <Popover
                                placement="bottomRight"
                                title={<div style={{textAlign: 'center'}}>{user.account}</div>}
                                content={
                                    <div >
                                        <Button block type={'link'} onClick={this.logout}>注销账号</Button>
                                        <Button block type={'link'}>个人中心</Button>
                                        <Button block type={'link'}>修改密码</Button>
                                    </div>
                                }
                                trigger="click">
                                <Avatar icon="user" style={{cursor:'pointer' }}/>
                            </Popover>
                            <span style={{marginLeft:5}}>{user.account}</span>
                        </div>
                    </div>
                </Header>
                <Layout style={{marginTop:61}}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                        style={{
                            position: 'fixed',
                            left: 0,
                            overflow: 'auto',
                            height: '100vh',
                            zIndex:10
                        }}
                    >
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="inline"
                            theme="dark"
                        >
                            <Item key={'/adminMain/home'}>
                                <Icon type={'home'} />
                                <span>{'首页'}</span>
                            </Item>
                            {
                                navArr.map(subNav => (
                                    <SubMenu
                                        key={subNav.key}
                                        title={
                                            <span>
                                                <Icon type="mail" />
                                                <span>{subNav.name}</span>
                                            </span>
                                        }>
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
                    <Layout style={{marginLeft:mainWidth}}>
                        <Header style={{backgroundColor:'#F0F2F5',padding:16,height:'fit-content'}}>
                            <NewBreadcrumb pathname={current}/>
                        </Header>
                        <Content
                            style={{
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

                        <Footer style={{ textAlign: 'center',padding:'10px 50px'}}
                                className={'footer'}>
                            Online Test System ©2020 Created by QingYuanO
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
//后台系统控制中心（路由跳转）
