import React,{Component} from 'react'
import {Route,Switch,Redirect,useRouteMatch} from 'react-router-dom'
import {Icon, Layout, Menu,Input } from "antd"

import ExaminationPaperList from "./ExaminationPaperList"
import MyExamination from "./MyExamination"
import ScoreInquiry from "./ScoreInquiry"
import JoinClass from "./JoinClass"
import PersonalCenter from "./PersonalCenter"
import ExaminationPage from "./ExaminationPage"
import UserContext from "../../context/UserContext"
import './style/examinee.css'
import cookie from "js-cookie"

const { Item  } = Menu;
const { Footer } = Layout;
const { Search } = Input;

const navArr = [
    {key:'/examineeMain/examinationPaperList',icon:'read',title:'全部考试'},
    {key:'/examineeMain/myExamination',icon:'solution',title:'已考考试'},
    // {key:'/examineeMain/scoreInquiry',icon:'search',title:'成绩查询'},
    // {key:'/examineeMain/joinClass',icon:'plus-circle',title:'加入班级'},
    // {key:'/examineeMain/personalCenter',icon:'user',title:'个人中心'},
]
const routerArr = [
    {path:'/examineeMain/examinationPaperList',component:ExaminationPaperList},
    {path:'/examineeMain/myExamination',component:MyExamination},
    {path:'/examineeMain/scoreInquiry',component:ScoreInquiry},
    {path:'/examineeMain/joinClass',component:JoinClass},
    {path:'/examineeMain/personalCenter',component:PersonalCenter},
    {path:'/examineeMain/examinationPage/:id',component:ExaminationPage},
]
export default class ExamineeMain extends Component{
    state = {
        current: '/examineeMain/examinationPaperList',
        isHide:false,
    };
    static contextType = UserContext;
    // componentDidMount() {
    //     console.log(555)
    // }
    componentWillUnmount() {
        this.setState(state => {
            return
        })
    }

    handleClick = e => {
        this.props.history.replace(e.key)
        this.setState({
            current: e.key,
        });
    };
    render() {
        if(this.context.permissions === 1){
            return <Redirect to={'/404'}/>
        }
        const curPath = this.props.location.pathname
        return(
            <Layout>
                {!curPath.match(/^\/examineeMain\/examinationPage\/\d+/)  ?
                    <Menu style={{ position: 'fixed', top: 0,left:0,right:0,zIndex:10,paddingLeft:'10%' }}
                          onClick={this.handleClick}
                          selectedKeys={[this.state.current]}
                          mode="horizontal"
                    >
                        {
                            navArr.map(nav => (
                                <Item key={nav.key} >
                                    <Icon type={nav.icon} />
                                    {nav.title}
                                </Item>
                            ))
                        }
                    </Menu>
                    :null
                }

                <Switch>
                    {
                        routerArr.map(router => (
                            <Route key={router.path} path={router.path} component={router.component}/>
                        ))
                    }

                </Switch>
                <Redirect to={'/examineeMain/examinationPaperList'}/>
                {
                    !curPath.match(/^\/examineeMain\/examinationPage\/\d+/) ?
                        <Footer style={{ textAlign: 'center',backgroundColor:'white',marginTop:40}}
                                className={'footer'}>  Online Test System ©2020 Created by QingYuanO
                        </Footer>
                        :null
                }

            </Layout>
        )
    }
}
