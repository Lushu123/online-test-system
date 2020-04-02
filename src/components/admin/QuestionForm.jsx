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
        this.props.form.validateFields((err, question) => {
            console.log(question)
            if (!err) {
                this.props.handle(question,this.props.form)
            }

        });

    };
    render() {
        const {getFieldDecorator} = this.props.form
        return(
            <Form onSubmit={this.handleSubmit}>
                <Row style={{marginTop:20}}>
                    <Col span={22} offset={1}>
                        <Item labelAlign={'left'} label={'题干'} labelCol={{ span: 2}} wrapperCol={{ span: 22}}>
                            {getFieldDecorator('questionStem', {
                                rules: [{ required: true, message: '请输入题干！' }],
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
                    <Col span={8} offset={1}>
                        <Item label={'正确答案'}>
                            {getFieldDecorator('realAnswer', {
                                rules: [{ required: true, message: '请选择正确答案！' }],
                            })(
                                <Radio.Group options={options}/>
                            )}
                        </Item>
                    </Col>
                    <Col span={3} offset={1}>
                        <Item label={'题目分值'} >
                            {getFieldDecorator('score', {
                                rules: [{ required: true, message: '请填写题目分值！' }],
                            })(
                                <InputNumber/>
                            )}
                        </Item>
                    </Col>
                    <Col span={8} offset={2}>
                        <Item label={'题目类型'} >
                            {getFieldDecorator('type', {
                                rules: [{ required: true, message: '请选择类型！' }],
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

        )
    }
}
export default Form.create()(QuestionForm)
