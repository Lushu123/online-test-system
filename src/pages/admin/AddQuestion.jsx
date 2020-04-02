import React,{Component} from 'react'
import QuestionForm from "../../components/admin/QuestionForm"
import {addQuestion} from '../../api/index'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {notification} from "antd"
import cookie from "js-cookie"

export default class AddQuestion extends Component{
    handle = (question,form) => {
        const userId = cookie.get('userid')
        Object.assign(question,{userId})
        addQuestion(question)
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
            <div style={{height:500,overflow:'auto'}}>
                <QuestionForm handle={this.handle}/>



        {/*        <SyntaxHighlighter showLineNumbers={true}*/}
        {/*                           startingLineNumber = {0}*/}
        {/*                           language={'jsx'}*/}
        {/*                           lineNumberStyle={{color: '#ddd', fontSize: 20}}*/}
        {/*                           wrapLines={true}*/}
        {/*                           lineProps={(num) => {console.log(num)} }>*/}
        {/*            {`*/}
        {/*  let codeInsertScript = <Code lang="js">{\`*/}
        {/*  (function(d) {var wfAD = d.createElement('script'), sAD = d.scripts[0];*/}
        {/*      wfAD.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';*/}
        {/*      wfAD.async = true;*/}
        {/*      sAD.parentNode.insertBefore(wfAD, sAD);*/}
        {/*  })(document);*/}
        {/*  \`}</Code>*/}
        {/*`.replace(/^\s+|\s+$/g, '')}*/}
        {/*        </SyntaxHighlighter>*/}
            </div>

        )
    }
}
//新增考题（不添加到任何考卷）
