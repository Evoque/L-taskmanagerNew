import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import './main.css';


import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane; 

import LTable from './components/LTable';
import FileTable from './components/FileTable';

class App extends React.Component {


    render() {
        return (
            <Tabs defaultActiveKey="1" style={{
                width: '95%', margin: '10px auto'
            }}>
                <TabPane tab={<span><Icon type="usergroup-add" />用户信息管理</span>} key="1">
                    <LTable />
                </TabPane>
                <TabPane tab={<span><Icon type="file" />文件管理</span>} key="2">
                    <FileTable />
                </TabPane>
                <TabPane tab={<span><Icon type="check-square-o" />进程管理</span>} key="3">
                    Tab 2
      </TabPane>
            </Tabs>
            // <div style={{backgroundColor: '#f9f9f9'}}>
    //   <Login />
    // </div>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)