import React,{Component} from 'react'
import {Tabs,Layout} from 'antd'
import TestPaperQuestionEditor from "../../components/admin/TestPaperQuestionEditor"
const { TabPane } = Tabs;
const {Content} = Layout

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `试卷${i}`,
        time: `120`,
        date: '2020-02-02',
        score: `100`,
        questionNum: `150题`,
        describe: `这是试卷1111111111111111111111111111111111111111111111111111111111111111 ${i}`,
    });
}
export default class AddQuestionToTestPaper extends Component{

    render() {
        return(

          <Tabs defaultActiveKey="1" tabPosition={'left'} style={{ height: 505 }}>
              {data.map(i => (
                  <TabPane tab={i.name} key={i.key}>
                      <TestPaperQuestionEditor name={i.name} id={i.key}/>
                  </TabPane>
              ))}
          </Tabs>

        )
    }
}
