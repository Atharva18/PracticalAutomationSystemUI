import React, { Component } from 'react'
import Sidebar from "components/Sidebar/Sidebar";
import Card from "components/Card/Card.jsx";
import { Grid, Row, Col, Table, Button } from "react-bootstrap"

export class AvailableExams extends Component {

    constructor(props) {
        super(props);
        // this.onSubmit = this.handleSubmit.bind(this);
        // this.handleChange1 = this.handleChange1.bind(this);
        // this.handleChange2 = this.handleChange2.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        }
    };

    componentDidMount() {
        fetch("http://localhost:8023/findAll-exam")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result.data
                    });
                },
                (error) => {
                    console.log("In Error");
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        return (
            <div>
                <Sidebar {...this.props} />
                <div id="main-panel" className="main-panel" ref="mainPanel">
                <Col md={12}>
                    <Card
                        title="AVAILABLE Exams"
                        category="AVAILABLE Exams"
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                            <Table align='center' striped hover responsive>
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Exam_Name</th>
                                        <th scope="col">Start_Date</th>
                                        <th scope="col">End_Date</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {items.map((item) => (
                                        <tr>
                                            <td align="center">{item.course}</td>
                                            <td align="center">{item.exam_name}</td>
                                            <td align="center">{item.start_date}</td>
                                            <td align="center">{item.end_date}</td>
                                            <td align="center">{item.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        }
                    />
                </Col>
            </div>
            </div>
        )
    }
}

export default AvailableExams
