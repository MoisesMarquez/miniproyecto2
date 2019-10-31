import React, { Component } from 'react'
import to from 'await-to-js'
import { Col, Input, Form, Button, Icon, DatePicker, notification } from 'antd'
let id = 0

const { inspectionService } = require('../../services')

class InspectionCreate extends Component {

    constructor(props) {
        super(props)
    }

    remove = k => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        

        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleSubmit = async e => {

        e.preventDefault()
        this.props.form.validateFieldsAndScroll(async (errForm, values) => {
            if (errForm) {
                notification.open({type: 'warning',message: 'please full fill all the form fields'})
                return false
            }
            if(!values.inspectors) {
                notification.open({type: 'warning',message: 'please add at least one inspector'})
                return
            }
            values.date = values.date.toISOString()
            const [, data] = await to(inspectionService.post(values))

            if(data.status === 201) {
                window.location.assign('/')
            }
            notification.open({type: 'error',message: 'error creating inspection'})
        })
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item

                label={`Inspector ${index + 1}`}
                required={false}
                key={k}
            >
                {getFieldDecorator(`inspectors[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            message: "Please input inspector name or delete it",
                        },
                    ],
                })(<Input placeholder="inspector name" style={{ width: '280px' }} />)}
                {keys.length >= 0 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));

        return (
            <div>
                <Col span={2} />
                <Col span={10}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label='Name'>
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'please, input the name of the session'
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label='Leader'>
                            {getFieldDecorator('leader', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'please, input the name of the leader'
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label='Artifact Owner'>
                            {getFieldDecorator('artifactOwner', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'please, input the name of the artifact owner'
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label='Artifact'>
                            {getFieldDecorator('artifact', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'please, input the name of the artifact'
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="DatePicker">
                            {getFieldDecorator('date', {
                                rules: [ 
                                    {
                                        required: true, 
                                        message: 'Please select a date'
                                    }
                                ]})(<DatePicker />)}
                        </Form.Item>
                        {
                            formItems
                        }
                        <Form.Item >
                            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                                <Icon type="plus" /> Add Inspector
                            </Button>
                        </Form.Item>
                        <Form.Item >
                            <Button type='primary' htmlType='submit'> Submit </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </div>
        )
    }
}
const WrappedInspectionCreate = Form.create({ name: 'InspectionCreate' })(InspectionCreate);
export default WrappedInspectionCreate