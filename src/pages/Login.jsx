import React,{Component} from 'react'
import {Form, Icon, Input, Button, notification} from 'antd'
import {Redirect} from 'react-router-dom'
import './style/login.css'
import FullScreenBG from "../components/FullScreenBG"
import {login} from "../api"
import cookie from 'js-cookie'
import PubSub from 'pubsub-js'

const Item = Form.Item
class Login extends Component{
    state = {
        loginSuccessData:{},
    };
    handleSubmit = e => {
        let _this = this
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('参数: ', values);
                login(values)
                    .then(function (response) {
                        let data = response.data
                        console.log(response);
                        _this.setState({loginSuccessData:data})
                        if(data.code === 0){
                            notification.error({message:data.msg,description:'请确认账号和密码！',duration:2})
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                        console.log("系统错误！")
                    });
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const {loginSuccessData} = this.state
        if(loginSuccessData.code === 1){
            cookie.set('userid',loginSuccessData.user.id)
            return <Redirect to={'/'}/>
        }
        return(
            <FullScreenBG>
                <Form onSubmit={this.handleSubmit} className="login-form" style={{opacity:0.75}}>
                    <Item className={'login-form-header'}>
                        <span >用户登陆</span>
                    </Item>
                    <Item>
                        {getFieldDecorator('account', {
                            rules: [{ required: true, message: '请输入账号！' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码！' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                        <a className="login-form-register" onClick={() => this.props.history.replace('/register')}>注册</a>
                        <a className="login-form-forgot" href="">
                            找回密码
                        </a>
                    </Item>
                </Form>
            </FullScreenBG>
        )
    }
}
export default Form.create({ name: 'normal_login' })(Login);
