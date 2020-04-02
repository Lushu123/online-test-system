import React,{Component} from 'react'
import TestPaperForm from "../../components/admin/TestPaperForm"
import {addTestPaper} from '../../api/index'
import cookie from "js-cookie"
import {notification} from "antd"
export default class AddTestPaper extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading:false,
        }
    }
    handle = (testPaper,form) => {
        Object.assign(testPaper,{isRelease:'0',date:testPaper.date.format('YYYY/MM/DD HH:mm:ss')})
        const userid = cookie.get('userid')
        console.log('Received testPaper of form: ', testPaper);
        this.setState({
            loading:true
        })
        addTestPaper({testPaper,userId:userid})
            .then((response) => {
                let data = response.data;
                if(data.code === 0){
                    notification.error({message:'添加失败！',duration:2})
                }else {
                    notification.info({message:'添加成功！',duration:2})
                    form.resetFields()
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
               <TestPaperForm type={'add'} handle={this.handle} loading={this.state.loading}/>
        )
    }
}

//添加考卷（此时只是考卷基本信息，考卷内没有考题）
