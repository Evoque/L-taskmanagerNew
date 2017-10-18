


import React from 'react';
import { Table, Icon, Button, Popconfirm, Spin } from 'antd';




export default class LTable extends React.Component {

    columnsNormal = [
        { title: '用户名称', dataIndex: 'user_name' },
        { title: '公司', dataIndex: 'user_comp' },
        { title: '部门', dataIndex: 'user_depar' },
        { title: '邮箱', dataIndex: 'user_email' },
        { title: '手机号', dataIndex: 'user_phone' } 
    ];

    columnsAdmin = [
        { title: '用户名称', dataIndex: 'user_name' },
        { title: '公司', dataIndex: 'user_comp' },
        { title: '部门', dataIndex: 'user_depar' },
        { title: '邮箱', dataIndex: 'user_email' },
        { title: '手机号', dataIndex: 'user_phone' },
        {
            title: '操作', key: 'action', render: (text, record) => (
                <span>
                    {/* 修改功能暂时没实现， 费劲  */}
                    {/* <a href="#">修改</a>
                    <span className="ant-divider" /> */}
                    <Popconfirm title="确定删除此用户的信息?"
                        onConfirm={this.deleteConfirm.bind(this, record)}
                        okText="Yes" cancelText="No">
                        <a href="#">删除</a>
                    </Popconfirm>
                </span>
            )
        }
    ];

    state = {
        data: [],
        saving: false
    }

    componentDidMount() {
        if (localStorage.users) {
            var data = JSON.parse(localStorage.users);
            this.setState({ data });
        }
    }

    deleteConfirm = (user) => {
        const data = this.state.data.filter(u => u.user_id !== user.user_id);
        this.setState({ data, saving: true }, () => {
            setTimeout(() => {
                localStorage.users = JSON.stringify(data);
                this.setState({ saving: false });
            }, 500);

        })
    }

    render() {
        var columns = this.props.loginUser === 'admin' ? this.columnsAdmin : this.columnsNormal;

        return (
            <div>
                <Spin spinning={this.state.saving}>
                    <Table columns={columns} dataSource={this.state.data} rowKey="user_id" />
                </Spin>
            </div>
        )
    }
}