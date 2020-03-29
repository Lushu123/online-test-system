import React,{Component} from 'react'
import {Button, DatePicker, Form, Input, notification,Spin} from "antd"
import locale from "antd/es/date-picker/locale/zh_CN"
import PropTypes from 'prop-types'
import cookie from "js-cookie"
import {addTestPaper,updateTestPaper} from '../../api/index'
const Item = Form.Item
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16,offset:1 },
}
class AddTestPaper extends Component{
    state = {
        loading:false,
    }
    static propTypes = {
        type:PropTypes.string.isRequired,
        updateData:PropTypes.object
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, testPaper) => {
            if (!err) {
                console.log('Received testPaper of form: ', testPaper);
                this.setState({
                    loading:true
                })
                if(this.props.type === 'add'){
                    Object.assign(testPaper,{isRelease:'0',date:testPaper.date.format('YYYY-MM-DD HH:mm:ss')})
                    const userid = cookie.get('userid')
                    addTestPaper({testPaper,userId:userid})
                        .then((response) => {
                           let data = response.data;
                            this.setState({
                                loading:false
                            })
                            if(data.code === 0){
                                notification.error({message:'添加失败！',duration:2})
                            }else {
                                notification.info({message:'添加成功！',duration:2})
                                this.props.form.resetFields()
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            console.log("系统错误！")
                        });
                }else {
                    const testPaperId = this.props.updateData.key
                    Object.assign(testPaper,{id:testPaperId,date:testPaper.date.format('YYYY-MM-DD HH:mm:ss')})
                    updateTestPaper(testPaper)
                        .then((response) => {
                        let data = response.data;
                        this.setState({
                            loading:false
                        })
                        if(data.code === 0){
                            notification.error({message:'修改失败！',duration:2})
                        }else {
                            notification.info({message:'修改成功！',duration:2})
                            this.props.history.push({
                                pathname: `/adminMain/test/testPaperEditor`,
                            })

                        }
                    })
                        .catch(function (error) {
                            console.log(error);
                            console.log("系统错误！")
                        });
                }
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const {type} = this.props
        return(
            <Spin size="large" spinning={this.state.loading}>
                <Form onSubmit={this.handleSubmit} hideRequiredMark={true} colon={false} className={'test-paper-editor-panel'}>
                    <Item style={{textAlign:'center',fontWeight:'bold'}}>
                        <span style={{fontSize:16}}>信息填写</span>
                    </Item>
                    <Item label={'试卷名'} {...formItemLayout}>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入试卷名！' }],
                            initialValue:type === 'update' ? this.props.updateData.title : ''
                        })(
                            <Input
                                placeholder="请输入试卷名"
                            />,
                        )}
                    </Item>
                    <Item label={'考试时间'} {...formItemLayout}>
                        {getFieldDecorator('date', {
                            rules: [{ required: true, message: '请输入试卷名！' }],
                            initialValue:type === 'update' ? this.props.updateData.date : ''
                        })(
                            <DatePicker showTime format="YYYY/MM/DD HH:mm:ss" style={{width:'100%'}} locale={locale}/>
                        )}
                    </Item>
                    <Item label={'考试时长'} {...formItemLayout}>
                        {getFieldDecorator('duration', {
                            rules: [{ required: true, message: '请输入考试时长！' }],
                            initialValue:type === 'update' ? this.props.updateData.duration : ''
                        })(
                            <Input
                                placeholder="请输入考试时长"
                            />,
                        )}
                    </Item>
                    <Item label={'总分数'} {...formItemLayout}>
                        {getFieldDecorator('totalScore', {
                            rules: [{ required: true, message: '请输入总分数！' }],
                            initialValue:type === 'update' ? this.props.updateData.totalScore : ''
                        })(
                            <Input
                                placeholder="请输入总分数"
                            />,
                        )}
                    </Item>
                    <Item label={'总题数'} {...formItemLayout}>
                        {getFieldDecorator('questionNum', {
                            rules: [{ required: true, message: '请输入总题数！' }],
                            initialValue:type === 'update' ? this.props.updateData.questionNum : ''
                        })(
                            <Input
                                placeholder="请输入总题数"
                            />,
                        )}
                    </Item>
                    <Item label={'描述'} {...formItemLayout}>
                        {getFieldDecorator('describe', {
                            initialValue:type === 'update' ? this.props.updateData.describe : ''
                        })(
                            <Input.TextArea
                                placeholder="描述内容"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        )}
                    </Item>
                    <Item style={{textAlign:'center'}}>
                        <Button type="primary" htmlType="submit" style={{marginRight:15}}>
                            {type === 'update' ? '修改' : '添加'}
                        </Button>
                    </Item>
                </Form>
            </Spin>

        )
    }
}
export default Form.create()(AddTestPaper)
