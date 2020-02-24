import React,{Component} from 'react'
import {Form,Input,Row, Col,Select,Radio,InputNumber,Button} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const { Option } = Select;

const options = [
    { label: '选项A', value: 'A' },
    { label: '选项B', value: 'B' },
    { label: '选项C', value: 'C' },
    { label: '选项D', value: 'D' },
];

class QuestionForm extends Component{
    static propTypes = {
        handle:PropTypes.func.isRequired
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handle(values)
            }

        });

    };
    render() {
        const {getFieldDecorator} = this.props.form
        return(
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={22} offset={1}>
                        <Item labelAlign={'left'} label={'题干'} labelCol={{ span: 2}} wrapperCol={{ span: 22}}>
                            {getFieldDecorator('questionName', {
                                rules: [{ required: true, message: '请输入题干！' }],
                            })(
                                <Input allowClear={true}/>
                            )}
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10} offset={1}>
                        <Item label={'题目类型'} >
                            {getFieldDecorator('type', {
                                rules: [{ required: true, message: '请选择类型！' }],
                            })(
                                <Select>
                                    <Option value="jack">选择题</Option>
                                    <Option value="lucy">填空题</Option>
                                </Select>
                            )}
                        </Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Item label={'知识范畴'}>
                            {getFieldDecorator('knowledgeCategory', {
                                rules: [{ required: true, message: '请填写知识范畴！' }],
                            })(
                                <Input allowClear={true}/>
                            )}
                        </Item>
                    </Col>

                </Row>
                <Row>
                    <Col span={10} offset={1}>
                        <Item label={'正确答案'}>
                            {getFieldDecorator('realAnswer', {
                                rules: [{ required: true, message: '请选择正确答案！' }],
                            })(
                                <Radio.Group options={options}/>
                            )}
                        </Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Item label={'题目分值'} >
                            {getFieldDecorator('score', {
                                rules: [{ required: true, message: '请填写题目分值！' }],
                            })(
                                <InputNumber/>
                            )}
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10} offset={1}>
                        <Item label={'选项A'} >
                            {getFieldDecorator('answerA', {
                                rules: [{ required: true, message: '请输入选项A！' }],
                            })(
                                <Input allowClear={true}/>
                            )}
                        </Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Item label={'选项B'}>
                            {getFieldDecorator('answerB', {
                                rules: [{ required: true, message: '请输入选项B！' }],
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
                            })(
                                <Input allowClear={true}/>
                            )}
                        </Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Item label={'选项D'}>
                            {getFieldDecorator('answerD', {
                                rules: [{ required: true, message: '请输入选项D！' }],
                            })(
                                <Input allowClear={true}/>
                            )}
                        </Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={22} offset={1}>
                        <Button type="primary" block={true} htmlType="submit">确认添加</Button>
                    </Col>
                </Row>
            </Form>

        )
    }
}
export default Form.create()(QuestionForm)
