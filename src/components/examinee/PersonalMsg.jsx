import React,{Component} from 'react'
import {Card, Icon, Avatar, Tooltip} from "antd"
import PubSub  from 'pubsub-js'
import cookie from "js-cookie"
import UserContext from "../../context/UserContext"
import UpdatePsdModel from "../UpdatePsdModel"

const { Meta } = Card;
export default class PersonalMsg extends Component{
    static contextType = UserContext;
    logout = () => {
        cookie.remove('userid')
        cookie.remove('certification')
        this.props.history.replace('/')
    }
    render() {
        return(
            <div>
                <Card
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <Tooltip title="修改密码">
                            <Icon type="edit" key="edit" onClick={() => PubSub.publish("model",true)}/>
                        </Tooltip>,
                        <Tooltip title="退出账号">
                            <Icon type="logout" key="logout" onClick={this.logout}/>
                        </Tooltip>,

                    ]}
                    bordered={false}
                >
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={this.context.account}
                    />
                </Card>
                <UpdatePsdModel history={ this.props.history}/>
            </div>

        )
    }
}

