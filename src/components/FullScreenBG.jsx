import React,{Component} from 'react'
import './style/fullScreenBG.css'
export default class FullScreenBG extends Component{

    render() {
        return(
            <div className={'full-screen-image'}>
                {this.props.children}
            </div>
        )
    }
}
