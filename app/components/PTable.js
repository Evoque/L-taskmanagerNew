
import React from 'react';
import { Table, Icon, Button } from 'antd';

import Cell from './EditCell';
import FileUploadBtn from './FileUploadBtn'
 

const data = [
    { key: 1, pro_name: "调研", pro_note: '需求调研', pro_itemname: '前期准备', pro_date:'2017-10-18 9:27', pro_bUserID: '林三三',pro_aUserID:'林三三' },
    { key: 2, pro_name: "调研", pro_note: '需求调研', pro_itemname: '前期准备', pro_date:'2017-10-18 9:27', pro_bUserID: '林三三',pro_aUserID:'林三三' },
    { key: 3, pro_name: "调研", pro_note: '需求调研', pro_itemname: '前期', pro_date:'2017-10-18 9:27', pro_bUserID: '林三三',pro_aUserID:'林三三' }
];


export default class FileTable extends React.Component {

    columns = [
        
        { title: '工作进程名称', dataIndex: 'pro_name' },
        { title: '工作进程描述', dataIndex: 'pro_note' },
        { title: '项目目录编号', dataIndex: 'pro_itemID' },
        { title: '工作进程记录时间', dataIndex: 'pro_date' },
        { title: '工作进程创建者ID', dataIndex: 'pro_bUserID' },
        { title: '工作进程参与者ID', dataIndex: 'pro_aUserID' },
        {
            title: '操作', key: 'action', render: (text, record) => (
                <span>
                    <a href="#">审核</a>
                    <span className="ant-divider" />
                    <a href="#">删除</a>
                </span>
            )
        }
    ];

    render() {

        return (
            <div>
                <FileUploadBtn />
                <Table columns={this.columns} dataSource={data} />
            </div>
        )

    }
}


