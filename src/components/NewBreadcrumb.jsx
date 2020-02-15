import React from 'react';
import { Link }from 'react-router-dom';
import { Breadcrumb  } from 'antd';

//具体导航的名称
const breadcrumbNameMap = {
    '/adminMain':'首页',
    '/adminMain/test':'考卷管理',
    '/adminMain/test/testPaperEditor':'考卷编辑',
    '/adminMain/test/addTestPaper':'新增考卷',
    '/adminMain/test/addQuestionToTestPaper':'添加考题',
    '/adminMain/question':'题库管理',
    '/adminMain/question/questionEditor':'题目编辑',
    '/adminMain/question/personalCenter':'个人中心',
}
export default class NewBreadcrumb extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        const pathSnippets = this.props.pathname.split('/').filter(i => i);
        // let arr=this.state.pathSnippets;
        // let pathname=this.context.router.history.location.pathname;
        //将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            let url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    {breadcrumbNameMap[url]}
                </Breadcrumb.Item>
            );
        });
        return <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>;
    }
}
