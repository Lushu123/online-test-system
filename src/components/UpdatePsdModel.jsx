import React,{Component} from 'react'
import {Form, Input, Modal, notification, Spin} from "antd"
import {updatePsd} from "../api"
import PubSub  from 'pubsub-js'
import UserContext from "../context/UserContext"
import cookie from "js-cookie"
const Item = Form.Item
class UpdatePsdModel extends Component{
    static contextType = UserContext;
    state = {
        visible: false,
        confirmDirty: false,
    };
    componentDidMount() {
        PubSub.subscribe("model",(topic,visible) => {
            this.setState({visible})
        })

    }
    componentWillUnmount() {
        this.setState(state => {
            return
        })
    }
    updatePsd = () => {
        this.props.form.validateFields((errors, values) => {
            if(!errors){
                console.log(values)
                updatePsd({password:values.password,oldPassword:values.oldPassword,userId:this.context.id})
                    .then(res => {
                        console.log(res.data)
                        const data = res.data;
                        if(data.code === 1){
                            notification.info({message:'修改成功,请重新登陆！',duration:2})
                            cookie.remove('userid')
                            cookie.remove('certification')
                            this.props.history.replace('/')
                            this.setState({visible:false})
                        }else {
                            notification.info({message:data.msg,duration:2})
                            this.setState({loading:false})
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
        });
        // this.setState({ visible:false });
    }
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

                <Modal
                    title="密码修改"
                    centered
                    visible={this.state.visible}
                    onOk={this.updatePsd}
                    onCancel={() => this.setState({visible:false})}
                    okText={'修改'}
                >
                    <Form layout={'vertical'}>

                        <Item label={'原密码'} hasFeedback>
                            {getFieldDecorator('oldPassword', {
                                rules: [{ required: true, message: '请输入密码！' }],
                            })(
                                <Input
                                    type="password"
                                    placeholder="请输入密码"
                                />,
                            )}
                        </Item>
                        <Item label={'新密码'} hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请确认密码！' },{validator: this.validateToNextPassword,}],
                            })(
                                <Input
                                    type="password"
                                    placeholder="请再次输入密码"
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
                    </Form>
                </Modal>

        )
    }
}
export default Form.create()(UpdatePsdModel);
