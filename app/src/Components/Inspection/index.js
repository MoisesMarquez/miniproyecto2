import React, { Component } from 'react'
import to from 'await-to-js'
import { Skeleton, Col, Row, Input, Button, Tag, DatePicker, notification } from 'antd'


const { inspectionService } = require('../../services')
class Inspection extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            _id: this.props.match.params._id,
            inspection: {},
            reschedule: false,
            newDate: ''
        }


    }

    async componentDidMount() {
        const { _id } = this.state

        const [, inspection] = await to(inspectionService.get(_id))

        if (inspection.status !== 200) {
            return
        }

        this.setState({
            inspection: inspection.data,
            isLoading: false
        })
    }

    async finishIt() {

        const { _id } = this.state
        const { date } = this.state.inspection

        const [, data] = await to(inspectionService.edit(_id, { status: 'Terminada', date }))

        if( data.status === 201) {
            notification.success({ message: 'inspection updated' })
            setTimeout(function(){
                window.location.href = "/"
             }, 2000);
            
        }
        else {
            notification.success({ message: 'inspection error' })
        }
    }

    async reschedule() {
        const { reschedule } = this.state

        if (!reschedule) {

            return this.setState({ reschedule: !reschedule })
        }
        const { _id, newDate } = this.state
        const [, data] = await to(inspectionService.edit(_id, { status: 'Reagendada', date: newDate }))

        if (data.status !== 201) {
            notification.error({ message: 'error updating inspection' })
        }
        else {
            notification.success({ message: 'inspection updated' })
            const { inspection } = this.state
            inspection.date = data.data.date
            this.setState({ 
                inspection,
                newDate: '',
                reschedule: !reschedule
            })
        }

    }

    onChangePicker(e) {
        this.setState({ newDate: e._d.toISOString() })
    }

    render() {

        const { isLoading } = this.state

        if (isLoading) {
            return (
                <Skeleton active={true} />
            )
        }



        const { name, leader, artifactOwner, artifact, status, date, inspectors } = this.state.inspection
        const { reschedule } = this.state

        const dateObj = new Date(date)
        const dateString = dateObj.toDateString()

        return (
            <div >
                <Col span={2} />
                <Col span={12} >
                    <Row style={{ marginBottom: '20px' }}>
                        <Input addonBefore='Inspection Name' value={name} />
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Input addonBefore='Leader' value={leader} />
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Input addonBefore='Artifact Owner' value={artifactOwner} />
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Input addonBefore='Artifact' value={artifact} />
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Input addonBefore='Status' value={status} />
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Input addonBefore='Date' value={dateString} key={dateString} />
                    </Row>
                    {
                        inspectors.length > 0 ?
                            inspectors.map((inspector, index) => {
                                return (
                                    <Row key={index} style={{ marginBottom: '20px' }}>
                                        <Input addonBefore={`Inspector ${index + 1}`} value={inspector} />
                                    </Row>
                                )
                            }) :
                            <Tag color='#cf1322' style={{ marginBottom: '20px' }}>No inspectors</Tag>
                    }
                    {
                        reschedule
                            ?
                            <Row style={{ marginBottom: '20px' }}>
                                <DatePicker onChange={e => this.onChangePicker(e)} />
                            </Row>
                            :
                            <div>

                            </div>

                    }
                    <Row style={{ marginBottom: '20px' }}>
                        {
                            reschedule
                                ? <Button style={{backgroundColor: '#a0d911'}} onClick={() => this.reschedule()}>update</Button>
                                : <Button disabled={status === 'Terminada'} onClick={() => this.reschedule()}>Reschedules</Button>
                        }
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <Button disabled={status === 'Terminada'} onClick={() => this.finishIt()}>Finish it!</Button>
                    </Row>
                </Col>
            </div>
        )
    }
}

export default Inspection