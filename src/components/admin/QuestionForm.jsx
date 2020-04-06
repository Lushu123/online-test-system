import React,{Component} from 'react'
import {Form,Input,Row, Col,Radio,InputNumber,Button,Spin} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item

const options = [
    { label: '选项A', value: 'A' },
    { label: '选项B', value: 'B' },
    { label: '选项C', value: 'C' },
    { label: '选项D', value: 'D' },
];

class QuestionForm extends Component{
    static propTypes = {
        type:PropTypes.string.isRequired,
        handle:PropTypes.func.isRequired,
        updateData:PropTypes.object,
        loading:PropTypes.bool,
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, question) => {
            if (!err) {
                this.props.handle(question,this.props.form)
            }

        });

    };
    render() {
        const {getFieldDecorator} = this.props.form
        const {type,updateData} = this.props
        return(
            <Spin spinning={this.props.loading}>
                <Form onSubmit={this.handleSubmit}>
                    <Row style={{marginTop:20}}>
                        <Col span={22} offset={1}>
                            <Item labelAlign={'left'} label={'题干'} labelCol={{ span: 2}} wrapperCol={{ span: 22}}>
                                {getFieldDecorator('questionStem', {
                                    rules: [{ required: true, message: '请输入题干！' }],
                                    initialValue:type === 'update' ? updateData.questionStem : null
                                })(
                                    <Input allowClear={true}/>
                                )}
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10} offset={1}>
                            <Item label={'选项A'} >
                                {getFieldDecorator('answerA', {
                                    rules: [{ required: true, message: '请输入选项A！' }],
                                    initialValue:type === 'update' ? updateData.answers.answerA : null
                                })(
                                    <Input allowClear={true}/>
                                )}
                            </Item>
                        </Col>
                        <Col span={10} offset={2}>
                            <Item label={'选项B'}>
                                {getFieldDecorator('answerB', {
                                    rules: [{ required: true, message: '请输入选项B！' }],
                                    initialValue:type === 'update' ? updateData.answers.answerB : null
                                })(
                                    <Input allowClear={true}/>
                                )}
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10} offset={1}>
                            <Item label={'选项C'} >
                                {getFieldDecorator('answerC', {
                                    rules: [{ required: true, message: '请输入选项C！' }],
                                    initialValue:type === 'update' ? updateData.answers.answerC : null
                                })(
                                    <Input allowClear={true}/>
                                )}
                            </Item>
                        </Col>
                        <Col span={10} offset={2}>
                            <Item label={'选项D'}>
                                {getFieldDecorator('answerD', {
                                    rules: [{ required: true, message: '请输入选项D！' }],
                                    initialValue:type === 'update' ? updateData.answers.answerD : null
                                })(
                                    <Input allowClear={true}/>
                                )}
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} offset={1}>
                            <Item label={'正确答案'}>
                                {getFieldDecorator('realAnswer', {
                                    rules: [{ required: true, message: '请选择正确答案！' }],
                                    initialValue:type === 'update' ? updateData.realAnswer : null
                                })(
                                    <Radio.Group options={options}/>
                                )}
                            </Item>
                        </Col>
                        <Col span={3} offset={1}>
                            <Item label={'题目分值'} >
                                {getFieldDecorator('score', {
                                    rules: [{ required: true, message: '请填写题目分值！' }],
                                    initialValue:type === 'update' ? updateData.score : null
                                })(
                                    <InputNumber/>
                                )}
                            </Item>
                        </Col>
                        <Col span={8} offset={2}>
                            <Item label={'题目类型'} >
                                {getFieldDecorator('type', {
                                    rules: [{ required: true, message: '请选择类型！' }],
                                    initialValue:type === 'update' ? updateData.type : null
                                })(
                                    <Input allowClear={true}/>
                                )}
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={22} offset={1} style={{textAlign:'center'}}>
                            <Button type="primary" htmlType="submit" >确认添加</Button>
                        </Col>
                    </Row>
                </Form>
            </Spin>


        )
    }
}
export default Form.create()(QuestionForm)
