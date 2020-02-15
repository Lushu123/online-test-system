import React,{Component} from 'react'
import { Form, Icon, Input, Button } from 'antd';
import './style/login.css'
import FullScreenBG from "../components/FullScreenBG"

const Item = Form.Item
class Login extends Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <FullScreenBG>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Item className={'login-form-header'}>
                        <span >用户登陆</span>
                    </Item>
                    <Item>
                        {getFieldDecorator('username', {
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
