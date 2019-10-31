import React, { Component } from 'react';
import { List, Col, Row, Button, Skeleton, Tag } from 'antd';
import { Link } from 'react-router-dom'


const { inspectionService } = require('../../services')
const { to } = require('await-to-js')

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            inspections: [],
            pendingInspections: [],
            finishedInspections: []
        }
    }

    async componentDidMount() {
        const [err, inspections] = await to(inspectionService.getAll())
        const pendingInspections = []
        const finishedInspections = []
        inspections.data.forEach(inspection => {
            if (inspection.status !== 'Terminada') {
                pendingInspections.push(inspection)
                return
            }
            finishedInspections.push(inspection)            
        })

        this.setState({
            inspections: inspections.data,
            pendingInspections,
            finishedInspections,
            isLoading: false
        })
    }

    render() {
        const { isLoading, pendingInspections, finishedInspections } = this.state
        if (isLoading) {
            return <Skeleton loading={true} />
        }

        return (
            <div>
                <Row type='flex' justify='start'>
                    <Col span={2} />
                    <Button><Link to={`newInspection`}  >Nueva Inspeccion</Link></Button>
                </Row>
                <br />
                <Row type='flex' justify='start'>
                    <Col span={2} />
                    <Col span={12}>
                        <List
                            dataSource={pendingInspections}
                            bordered
                            renderItem={item => (
                                <List.Item>
                                    <div>{item.name}</div>
                                    {
                                        <Tag style={{marginLeft: '10px'}} color={item.status === 'Pendiente' ? 'orange' : 'volcano'}>
                                        {item.status}
                                        </Tag>
                                    }
                                    <List.Item.Meta

                                        description={item.artifact}
                                    />
                                    {

                                    }
                                    <Button type='primary'><Link to={`inspection/${item._id}`}  >Join</Link></Button>
                                </List.Item>
                            )}
                        >
                        </List>
                    </Col>
                </Row>
                <br />
                <Row type='flex' justify='start'>
                    <Col span={2} />
                    <Col span={12}>
                        <List
                            dataSource={finishedInspections}
                            bordered
                            renderItem={item => (
                                <List.Item>
                                    <div>{item.name}</div>
                                    {
                                        <Tag style={{marginLeft: '10px'}} color='green'>
                                        {item.status}
                                        </Tag>
                                    }
                                    <List.Item.Meta

                                        description={item.artifact}
                                    />
                                    {

                                    }
                                    <Button type='primary'><Link to={`inspection/${item._id}`}  >View</Link></Button>
                                </List.Item>
                            )}
                        >
                        </List>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home