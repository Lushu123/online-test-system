import React,{Component} from 'react'
import TestPaperForm from "../../components/admin/TestPaperForm"
import moment from 'moment';
export default class UpdateTestPaper extends Component{
    render() {
        const updateData = this.props.location.state
        updateData.date = moment(updateData.date)
        console.log(updateData)
        return(
               <TestPaperForm type={'update'} handleSubmit={this.handleSubmit} updateData={updateData}/>
        )
    }
}

//修改考卷的基本信息
