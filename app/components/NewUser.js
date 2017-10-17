

import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var user = {
                    user_name: values.user_name,
                    user_comp: values.user_comp,
                    user_depar: values.user_depar,
                    user_email: values.user_email,
                    user_phone: values.user_phone
                };

                var users = JSON.parse(localStorage.users || '[]');
                if (users.length === 0) {
                    user.user_id = 1;
                } else {
                    user.user_id = users[users.length - 1].user_id + 1;
                }

                users.push(user);

                localStorage.users = JSON.stringify(users);
                this.props.onOk();
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 60 }}>
                <Option value="86">+86</Option>
            </Select>
            );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem {...formItemLayout} label="姓名" hasFeedback>
                    {getFieldDecorator('user_name', {
                        rules: [{ required: true, message: '请输入姓名!', whitespace: true }],
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="公司" hasFeedback>
                    {getFieldDecorator('user_comp', {
                        rules: [{ required: true, message: '请输入公司名称!', whitespace: true }],
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="部门" hasFeedback>
                    {getFieldDecorator('user_depar', {
                        rules: [{ required: true, message: '请输入部门名称!', whitespace: true }],
                    })(<Input />)}
                </FormItem>

                <FormItem {...formItemLayout} label="邮箱" hasFeedback>
                    {getFieldDecorator('user_email', {
                        rules: [{
                            type: 'email', message: '请输入正确的邮箱地址!',
                        }, {
                            required: true, message: '请输入邮箱!',
                        }],
                    })(<Input />)}
                </FormItem>

                <FormItem {...formItemLayout} label="手机号" >
                    {getFieldDecorator('user_phone', { rules: [{ required: true, message: '请输入手机号!' }], })
                        (
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                </FormItem>


                <FormItem {...formItemLayout} label="密码" hasFeedback  >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                        )}
                </FormItem>

                <FormItem  {...formItemLayout} label="确认密码" hasFeedback >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请再次输入密码!',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
                </FormItem>


                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">注册</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);


export default WrappedRegistrationForm;