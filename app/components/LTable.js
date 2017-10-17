


import React from 'react';
import { Table, Icon, Button } from 'antd';

const columns = [
    { title: '用户编号', dataIndex: 'user_id' },
    { title: '用户名称', dataIndex: 'user_name' },
    { title: '公司', dataIndex: 'user_comp' },
    { title: '部门', dataIndex: 'user_depar' },
    { title: '邮箱', dataIndex: 'user_email' },
    { title: '手机号', dataIndex: 'user_phone' },
    {
        title: '操作', key: 'action', render: (text, record) => (
            <span>
                <a href="#">修改</a>
                <span className="ant-divider" />
                <a href="#">删除</a>
            </span>
        )
    }
];

const data = [
    { user_id: 1, user_name: '林二二', user_comp: "国安", user_depar: '供应链管理中心', user_email: 'yy@gmail.com', user_phone: 17600852075 },
    { user_id: 2, user_name: '林二二', user_comp: "国安", user_depar: '供应链管理中心', user_email: 'yy@gmail.com', user_phone: 17600852075 },
    { user_id: 3, user_name: '林二二', user_comp: "国安", user_depar: '供应链管理中心', user_email: 'yy@gmail.com', user_phone: 17600852075 },
    { user_id: 4, user_name: '林二二', user_comp: "国安", user_depar: '供应链管理中心', user_email: 'yy@gmail.com', user_phone: 17600852075 },
    { user_id: 5, user_name: '林二二', user_comp: "国安", user_depar: '供应链管理中心', user_email: 'yy@gmail.com', user_phone: 17600852075 }

];


export default class LTable extends React.Component {

    render() {

        return (

            <div>
                <Table columns={columns} dataSource={data} rowKey="user_id" />
            </div>
        )
    }
}