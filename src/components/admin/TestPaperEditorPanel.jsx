import React,{Component} from 'react'
import { Form, Icon, Input, Button,Empty,DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import PropTypes from 'prop-types'
import '../style/testPaperEditorPanel.css'
const Item = Form.Item
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: { span: 4,offset:1 },
    wrapperCol: { span: 16,offset:1 },
}
const ClearInput = (props) => (
    <Input allowClear={true} {...props}/>
)
class TestPaperEditorPanel extends Component{
    static propTypes = {
        curTestPaper:PropTypes.object.isRequired
    }
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
        const {curTestPaper} = this.props
        console.log(curTestPaper)
        return(
            <div>
                {curTestPaper.name !== undefined
                        ? <Form onSubmit={this.handleSubmit} hideRequiredMark={true} colon={false} className={'test-paper-editor-panel'}>
                        <Item style={{textAlign:'center',fontWeight:'bold'}}>
                            <span >{curTestPaper.name}</span>
                        </Item>
                        <Item label={'试卷名'} {...formItemLayout}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入试卷名！' }],
                            })(
                                <ClearInput
                                    placeholder="请输入试卷名"
                                />,
                            )}
                        </Item>
                        <Item label={'考试时间'} {...formItemLayout}>
                            {getFieldDecorator('date', {
                                rules: [{ required: true, message: '请输入试卷名！' }],
                            })(
                                <DatePicker showTime format="YYYY/MM/DD HH:mm:ss" style={{width:233}} locale={locale}/>
                            )}
                        </Item>
                        <Item label={'考试时长'} {...formItemLayout}>
                            {getFieldDecorator('time', {
                                rules: [{ required: true, message: '请输入考试时长！' }],
                            })(
                                <Input
                                    placeholder="请输入考试时长"
                                />,
                            )}
                        </Item>
                        <Item label={'总分数'} {...formItemLayout}>
                            {getFieldDecorator('score', {
                                rules: [{ required: true, message: '请输入总分数！' }],
                            })(
                                <Input
                                    placeholder="请输入总分数"
                                />,
                            )}
                        </Item>
                        <Item label={'总题数'} {...formItemLayout}>
                            {getFieldDecorator('questionNum', {
                                rules: [{ required: true, message: '请输入总题数！' }],
                            })(
                                <Input
                                    placeholder="请输入总题数"
                                />,
                            )}
                        </Item>
                        <Item label={'描述'} {...formItemLayout}>
                            {getFieldDecorator('describe', {
                            })(
                                <TextArea
                                    placeholder="描述内容"
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                />
                            )}
                        </Item>
                        <Item style={{textAlign:'center'}}>
                            <Button type="primary" htmlType="submit" style={{marginRight:15}}>
                                修改
                            </Button>
                            <Button type="danger" htmlType="submit" >
                                删除
                            </Button>
                        </Item>
                    </Form>
                        : <Empty
                            description={'暂无选择试卷'}
                            imageStyle={{marginTop:'50%'}}
                        />
                }
            </div>


        )
    }
}
export default Form.create()(TestPaperEditorPanel);
