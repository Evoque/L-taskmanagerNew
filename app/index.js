import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import './main.css';


import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

import LTable from './components/LTable';
import FileTable from './components/FileTable';
import Login from './components/Login';
import PTable from './components/PTable';

class App extends React.Component {

    state = { 
        loginUser: undefined
    }

    handleLogin = (user_email) => {
        this.setState({ loginUser: user_email });
    }


    render() {
        let style = {};
        if (this.state.loginUser) {
            style = {
                background: 'white'
            }
        }
        return (
            <div className="container" style={style}>
                {
                    this.state.loginUser ?
                        <Tabs defaultActiveKey="1" style={{ width: '95%', margin: '10px auto' }}>
                            <TabPane className="container-panel" tab={<span><Icon type="usergroup-add" />用户信息管理</span>} key="1">
                                <LTable loginUser={this.state.loginUser} />
                            </TabPane>
                            <TabPane className="container-panel" tab={<span><Icon type="file" />文件管理</span>} key="2">
                                <FileTable />
                            </TabPane>
                            <TabPane className="container-panel" tab={<span><Icon type="check-square-o" />进程管理</span>} key="3">
                            <PTable />
                            </TabPane>
                        </Tabs>
                        : <Login login={this.handleLogin} />
                }
            </div>

        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)