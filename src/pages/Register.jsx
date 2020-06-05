import React,{Component} from 'react'
import { Form, Icon, Input, Button,Select,notification } from 'antd';
import {Redirect} from 'react-router-dom'
import './style/register.css'
import FullScreenBG from "../components/FullScreenBG"
import {register} from "../api"
const Item = Form.Item
const { Option } = Select;
class Register extends Component{
    state = {
        confirmDirty: false,
        code:0,
    };
    componentDidMount() {
        console.log('111')
    }

    handleSubmit = e => {
        e.preventDefault();
        let _this = this
        this.props.form.validateFields((err, values) => {
            if (!err) {
                delete values.confirm
                console.log('传参: ', values);
                register(values)
                    .then(function (response) {
                        let data = response.data
                        _this.setState({code:response.data.code})
                        if(data.code === 1){
                            notification.success({message:"注册成功",description:'注册成功，请登录',duration:2})
                        }else {
                            notification.error({message:"注册失败",description:data.msg,duration:2})
                        }

                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                        console.log("系统错误！")
                    });
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
        const {code} = this.state
        if(code === 1){
            return <Redirect to={'/login'}/>
        }
        return(
            <FullScreenBG>
                <Form onSubmit={this.handleSubmit} className="login-form" layout={'vertical'}>
                    <Item className={'login-form-header'}>
                        <span >用户注册</span>
                    </Item>
                    <Item label={'用户名'} hasFeedback>
                        {getFieldDecorator('account', {
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
                    <Item label={'注册类型'} hasFeedback>
                        {getFieldDecorator('permissions', {
                            rules: [
                                {required: true, message: '前选择注册类型!'},
                            ],
                        })(
                            <Select>
                                <Option value="0">考生</Option>
                                <Option value="1">管理员</Option>
                            </Select>
                        )}

                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{marginBottom:5}}>
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
