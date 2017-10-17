



import React from 'react';

import { Form, Icon, Input, Button, Checkbox, Spin, Modal } from 'antd';
const FormItem = Form.Item;

import NewUser from './NewUser';

class NormalLoginForm extends React.Component {

    state = {
        spinning: false,
        visible: false
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                if (localStorage[values.username] && localStorage[values.username] === values.password) {

                    this.invokeLogin();
                }

                if (values.username === 'admin' && values.password === 'admin') {
                    this.invokeLogin();
                }

            }
        });
    }


    invokeLogin = () => {

        this.setState({ spinning: true }, () => {

            setTimeout(() => {
                this.setState({ spinning: false }, () => {
                    this.props.login();
                })
            }, 1500);
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>

                <Spin spinning={this.state.spinning} tip="登录中...">
                    <Form onSubmit={this.handleSubmit}
                        style={{
                            maxWidth: 400,
                            margin: '100px auto',
                            border: '1px solid rgba(0,0,0,.3)',
                            padding: 20,
                            paddingTop: 40,
                            borderRadius: 5,
                            backgroundColor: 'white'
                        }}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                                )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                                )}
                            <a style={{ float: 'right' }} href="">忘记密码</a>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                登录
                    </Button>
                            Or <a href="#" onClick={this.showModal}>注册!</a>
                        </FormItem>
                    </Form>
                </Spin>

                <Modal
                    title="用户注册"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[]}
                    >
                    <NewUser onOk={this.handleOk}/>
                </Modal>


            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
