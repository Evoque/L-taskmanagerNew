



import React from 'react';

import { Form, Icon, Input, Button, Checkbox, Spin, Modal, message } from 'antd';
const FormItem = Form.Item;

import NewUser from './NewUser';
import ResetPassword from './ResetPassword';

class NormalLoginForm extends React.Component {

    state = {
        spinning: false,
        visible: false,
        visiblePwd: false
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                if (values.user_email === 'admin' && values.user_pwd === 'admin') {
                    this.invokeLogin('admin');
                    return;
                }

                if (localStorage.users) {

                    var users = JSON.parse(localStorage.users);
                    var user = users.filter(u => u.user_email === values.user_email && u.user_pwd === values.user_pwd);
                   
                    if (user.length > 0) {
                        this.invokeLogin(user[0].user_email);
                    } else {
                        message.error('邮箱或密码错误!');
                        return;
                    }

                }
            }
        });
    }


    invokeLogin = (user_email) => {

        this.setState({ spinning: true }, () => {

            setTimeout(() => {
                this.setState({ spinning: false }, () => {
                    this.props.login(user_email);
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
                            {getFieldDecorator('user_email', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="邮箱" />
                                )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('user_pwd', {
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
                            <a style={{ float: 'right' }} href="#" onClick={() => this.setState({visiblePwd: true})}>忘记密码</a>
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
                    <NewUser onOk={this.handleOk} />
                </Modal>

                <Modal
                    title="密码重置"
                    visible={this.state.visiblePwd}
                    onOk={() => this.setState({visiblePwd: false})}
                    onCancel={() => this.setState({visiblePwd: false})}
                    footer={[]}
                >
                    <ResetPassword onOk={() => this.setState({visiblePwd: false})} />
                </Modal>


            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
