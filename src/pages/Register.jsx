import React,{Component} from 'react'
import { Form, Icon, Input, Button,Select } from 'antd';
import './style/register.css'
import FullScreenBG from "../components/FullScreenBG"
const Item = Form.Item
const { Option } = Select;
class Register extends Component{
    state = {
        confirmDirty: false,

    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('与第一次输入的密码不一致!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <FullScreenBG>
                <Form onSubmit={this.handleSubmit} className="login-form" layout={'vertical'}>
                    <Item className={'login-form-header'}>
                        <span >用户注册</span>
                    </Item>
                    <Item label={'用户名'} hasFeedback>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名！' }],
                        })(
                            <Input
                                placeholder="请输入用户名"
                            />,
                        )}
                    </Item>
                    <Item label={'密码'} hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码！' },{validator: this.validateToNextPassword}],
                        })(
                            <Input
                                type="password"
                                placeholder="请输入密码"
                            />,
                        )}
                    </Item>
                    <Item label={'确认密码'} hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [{ required: true, message: '请确认密码！' },{validator: this.compareToFirstPassword,}],
                        })(
                            <Input
                                type="password"
                                placeholder="请再次输入密码"
                                onBlur={this.handleConfirmBlur}
                            />,
                        )}
                    </Item>
                    <Item label={'电话'} hasFeedback>
                        {getFieldDecorator('phoneNumber', {
                            rules: [
                                { required: true, message: '请输入电话号码!' },
                                {pattern:new RegExp(/^1[3456789]\d{9}$/),message: '请输入正确的电话号码！'},
                                ],
                        })(
                            <Input
                                placeholder="请输入电话号码"
                            />,
                        )}
                    </Item>
                    <Item label={'注册类型'} hasFeedback>
                        {getFieldDecorator('userType', {
                            rules: [
                                {required: true, message: '前选择注册类型!'},
                            ],
                        })(
                            <Select>
                                <Option value="考生">考生</Option>
                                <Option value="管理员">管理员</Option>
                            </Select>
                        )}

                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            注册
                        </Button>
                        <span className="login-form-login">
                            已有账号？
                            <a onClick={() => this.props.history.replace('/login')}>
                             马上登陆
                            </a>
                        </span>

                    </Item>
                </Form>
            </FullScreenBG>
        )
    }
}
export default Form.create({ name: 'normal_login' })(Register);
