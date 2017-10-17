
import React from 'react';
import { Table, Icon, Button } from 'antd';

const columns = [
    { title: '文件名', dataIndex: 'filename' },
    { title: '描述', dataIndex: 'desc' },
    { title: '上传时间', dataIndex: 'filetime' },
    { title: '上传人', dataIndex: 'filer' },
    {
        title: '操作', key: 'action', render: (text, record) => (
            <span>
                <a href="#">下载</a>
                <span className="ant-divider" />
                <a href="#">删除</a>
            </span>
        )
    }
];

const data = [
    { key: 1, filename: "论仙女的自我修养", desc: '自我描述', filetime: "2017-10-22 10:30", filter: '林三三' },
    { key: 2, filename: "论仙女的自我修养", desc: '自我描述', filetime: "2017-10-22 10:30", filter: '林三三' },
    { key: 3, filename: "论仙女的自我修养", desc: '自我描述', filetime: "2017-10-22 10:30", filter: '林三三' },
    { key: 4, filename: "论仙女的自我修养", desc: '自我描述', filetime: "2017-10-22 10:30", filter: '林三三' },
    { key: 5, filename: "论仙女的自我修养", desc: '自我描述', filetime: "2017-10-22 10:30", filter: '林三三' }
];


export default class FileTable extends React.Component {

    render() {

        return (
            <div> 
                <Button type="primary" icon="upload" style={{ marginBottom: 10}}>上传</Button>
                <Table columns={columns} dataSource={data} />
            </div>
        )

    }
}