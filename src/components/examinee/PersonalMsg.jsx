import React,{Component} from 'react'
import {Card, Icon, Avatar} from "antd"

const { Meta } = Card;
export default class PersonalMsg extends Component{

    render() {
        return(
                <Card
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <Icon type="edit" key="edit" />,
                        <Icon type="logout" key="logout"/>,
                    ]}
                    bordered={false}
                >
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="青园"
                        description="大风起兮云飞扬，维加海内兮归故乡。安得猛士兮守四方"
                    />
                </Card>
        )
    }
}
