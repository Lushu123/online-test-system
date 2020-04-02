import React,{Component} from 'react'
import TestPaperForm from "../../components/admin/TestPaperForm"
import moment from 'moment';
import cookie from "js-cookie"
import {addTestPaper, updateTestPaper} from "../../api"
import {notification} from "antd"
export default class UpdateTestPaper extends Component{
    constructor(props){
        super(props)
        this.state = {
            updateData:{},
            loading:false,
        }
    }
    componentDidMount() {
        const updateData = this.props.location.state
        updateData.date = moment(updateData.date)
        this.setState({
            updateData
        })
    }

    handle = (testPaper,form) => {
        const testPaperId = this.state.updateData.key
        Object.assign(testPaper,{id:testPaperId,date:testPaper.date.format('YYYY/MM/DD HH:mm:ss')})
        console.log('Received testPaper of form: ', testPaper);
        this.setState({
            loading:true
        })
        updateTestPaper(testPaper)
            .then((response) => {
                let data = response.data;
                if(data.code === 0){
                    notification.error({message:'修改失败！',duration:2})
                }else {
                    const testPaper = JSON.parse(JSON.stringify(data.testPaper).replace(/id/g,"key"));
                    notification.info({message:'修改成功！',duration:2})
                    this.setState({
                        updateData:testPaper
                    })

                }
                this.setState({
                    loading:false
                })
            })
            .catch(function (error) {
                console.log(error);
                console.log("系统错误！")
            });
    };
    render() {

        return(
               <TestPaperForm type={'update'} handle={this.handle} updateData={this.state.updateData} loading={this.state.loading}/>
        )
    }
}

//修改考卷的基本信息
