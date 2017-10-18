
import React from 'react';
import { Upload, message, Button, Icon } from 'antd';



export default class FileUploadBtn extends React.Component {

  ops = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  render() {
    return (
      <Upload {...this.ops}>
        <Button type="primary" style={{marginBottom: '10px'}}> <Icon type="upload" /> 点击上传</Button>
      </Upload>
    )
  }
}