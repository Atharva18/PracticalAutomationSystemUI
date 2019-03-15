import React, { Component } from 'react';
import Sidebar from "components/Sidebar/Sidebar";
import Dashboard from 'layouts/Dashboard/Dashboard.jsx';
import admindashboardRoutes from 'routes/admindashboard.jsx';
import "antd/dist/antd.css";
import {
    Form, Input, Select, Button, Row, Col, Card
} from 'antd';
const Option = Select.Option;

export class AddSubject extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        branch: '',
        code: '',
        subject: '',
        sem: '',
        year: '',
        pattern: '',
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('IN submit');
        fetch('http://localhost:8023/course-create', {
            method: 'POST',
            body: JSON.stringify({
                branch: this.state.branch,
                code: this.state.code,
                course: this.state.subject,
                sem: this.state.sem,
                year: this.state.year,
                Pattern: this.state.pattern,
            }),
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json())
            .then(response => {
                console.log(response.body);
                if (response.result === 'Success') {

                    alert(response.result);
                }
                else {
                    alert(response.result);
                }
            });
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        alert('called')
        console.log('hello');
    }
    handleChangeSelect = (e) => {
        this.setState({ sem: e.label });
        console.log(e.label);
        alert(e.label);
    }
    handleChangeSelect1 = (e) => {
        this.setState({ year: e.label });
        console.log(e.label);
        alert(e.label);
    }
    handleChangeSelect2 = (e) => {
        this.setState({ branch: e.label });
        console.log(e.label);
        alert(e.label);
    }
    // componentDidMount() {
    //     fetch("http://localhost:8023/findAll-role")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 console.log(result);
    //                 this.setState({
    //                     roles: result.data
    //                 });
    //             },
    //             (error) => {
    //                 console.log("In Error");
    //                 this.setState({

    //                     error
    //                 });
    //             }
    //         )
    // }
    render() {
        return (

            <Row gutter={16}>
                <Col span={40}>
                    <Card title="Add Subject" bordered={true} style={{ width: 350, margin: "80px" }}  ><p></p>
                        {/* <form onSubmit={this.handleSubmit}> */}
                        <div>
                            <Sidebar {...this.props}></Sidebar>
                            <label>Add Subject: </label><input placeholder="Subject Name" name="subject" onChange={this.handleChange}></input><br /><br />
                            University Code:<input placeholder="University Code" name="code" onChange={this.handleChange}></input><br /><br />
                            Pattern:<input placeholder="Pattern" name="pattern" onChange={this.handleChange}></input><br /><br />
                            Branch:<Select labelInValue defaultValue={{ key: 'Branch' }} onChange={this.handleChangeSelect2} style={{ width: 120 }} name="branch">
                                <Option value="Computer">Computer</Option>
                                <Option value="IT">IT</Option>
                                <Option value="ENTC">ENTC</Option>
                            </Select><br /><br />
                            Semester:<Select labelInValue defaultValue={{ key: 'Semester' }} onChange={this.handleChangeSelect1} style={{ width: 120 }} name="sem">
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                                <Option value="6">6</Option>
                                <Option value="7">7</Option>
                                <Option value="8">8</Option>
                            </Select><br /><br />
                            Year:<Select style={{ width: 120 }} labelInValue defaultValue={{ key: 'Year' }} onChange={this.handleChangeSelect} name="year">
                                <Option value="SE">SE</Option>
                                <Option value="TE">TE</Option>
                                <Option value="BE">BE</Option>
                            </Select><br /><br />
                            <Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.handleSubmit}>
                                Submit!!
                            </Button>
                        </div>
                        
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default AddSubject;
