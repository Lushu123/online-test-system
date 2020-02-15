import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Anchor , Card, Icon} from "antd"

import '../style/InformationTip.css'

const {Meta,Grid} = Card
const { Link } = Anchor;
const gridStyle = {
    width: '20%',
    textAlign: 'center',
};
export default class InformationTip extends Component{
    static propTypes = {
        isChoiceArr:PropTypes.object.isRequired
    }
    render() {
        const {isChoiceArr} = this.props
        return(
            <Anchor  className={'information-tip'} showInkInFixed={false}>
                <Card
                    title={'答题卡'}
                    bordered={false}
                    actions={[
                        <span>
                        <Icon type="dashboard" style={{marginRight:8}}/>
                            {'150:00'}
                    </span>,
                        '提交',
                    ]}
                    bodyStyle={{height:272,overflow:'auto'}}
                >
                    {
                        Object.keys(isChoiceArr).map((item,index) => (
                            <Grid
                                className={isChoiceArr[item].isChoice ? 'is-choice' : ''}
                                key={index}
                                style={gridStyle}
                            >
                                <Link href={`#${item}`} title={`${index+1}`} />
                            </Grid>
                        ))
                    }
                </Card>
            </Anchor>

        )
    }
}
