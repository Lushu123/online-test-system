import React,{Component} from 'react'
import {Form,Input} from 'antd'

const Item = Form.Item
class AddNewQuestion extends Component{

    render() {
        const {getFieldDecorator} = this.props.form
        return(
            <Form>
                <Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入题干！' }],
                    })(
                        <Input allowClear={true}/>
                    )}
                </Item>
            </Form>
        )
    }
}

export default Form.create()(AddNewQuestion)
