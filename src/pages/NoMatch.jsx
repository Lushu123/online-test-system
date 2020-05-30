import React,{Component} from 'react'
import { Result, Button } from 'antd';
export default class NoMatch extends Component{

    render() {
        return(
            <Result
                status="404"
                title="404"
                subTitle="抱歉, 你访问的页面不存在。"
                extra={<Button type="primary" onClick={this.props.history.push('/')}>回到主页</Button>}
            />
        )
    }
}
