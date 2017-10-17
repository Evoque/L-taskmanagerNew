import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import './main.css';


import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

import LTable from './components/LTable';
import FileTable from './components/FileTable';
import Login from './components/Login';

class App extends React.Component {

    state = {
        isLogin: false
    }
 
    

    render() {
        let style = {};
        if (this.state.isLogin) {
          style = {
              background: 'white'
          }
        }
        return (
            <div className="container" style={style}>
                 { 
                     this.state.isLogin ? 
                        <Tabs defaultActiveKey="1" style={{ width: '95%', margin: '10px auto'}}>
                            <TabPane className="container-panel" tab={<span><Icon type="usergroup-add" />用户信息管理</span>} key="1">
                                <LTable />
                            </TabPane>
                            <TabPane  className="container-panel" tab={<span><Icon type="file" />文件管理</span>} key="2">
                                <FileTable />
                            </TabPane>
                            <TabPane className="container-panel"  tab={<span><Icon type="check-square-o" />进程管理</span>} key="3">
                                Tab 2
                            </TabPane>
                        </Tabs>
                         : <Login  login={() => this.setState({isLogin : true})}/> 
                 } 
            </div>

        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)