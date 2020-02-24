import React,{Component} from 'react'
import TestPaperForm from "../../components/admin/TestPaperForm"
export default class AddTestPaper extends Component{

    render() {

        return(
               <TestPaperForm type={'add'} handleSubmit={this.handleSubmit}/>
        )
    }
}

//添加考卷（此时只是考卷基本信息，考卷内没有考题）
