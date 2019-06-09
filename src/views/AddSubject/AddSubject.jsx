import React, { Component } from 'react';
import Sidebar from "components/Sidebar/Sidebar";
import Dashboard from 'layouts/Dashboard/Dashboard.jsx';
import admindashboardRoutes from 'routes/admindashboard.jsx';
import Header from "components/Header/Header";
import "antd/dist/antd.css";
import { Table } from "react-bootstrap"
import {
    Form, Input, Select, Button, Row, Col, Card
} from 'antd';
const Option = Select.Option;
const tabList = [{
    key: 'tab1',
    tab: 'tab1',
}, {
    key: 'tab2',
    tab: 'tab2',
}];

const contentList = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
};

export class AddSubject extends Component {

    constructor(props) {
        super(props);
        // this.onSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            text: ''
        }
    };

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        branch: '',
        code: '',
        subject: '',
        sem: '',
        year: '',
        pattern: '',
        key: 'tab1'
    };

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    }

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
        console.log('hello');
    }
    handleChangeSelect = (e) => {
        this.setState({ sem: e.label });
        console.log(e.label);
    }
    handleChangeSelect1 = (e) => {
        this.setState({ year: e.label });
        console.log(e.label);
    }
    handleChangeSelect2 = (e) => {
        this.setState({ branch: e.label });
        console.log(e.label);
    }
    componentDidMount() {

        fetch("http://localhost:8023//findAll-role")
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
            <div align='left' id="main-panel" className="main-panel" ref="mainPanel">
                <Header {...this.props} />
            <div style={{ padding: '30px', width: '50%', margin: '30px', height: '50%' }}>
                <Row gutter={16}>
                    <Col span={15}>
                        <Card title="Add Subject" bordered={true}> <form onSubmit={this.handleSubmit}>
                            <form onSubmit={this.handleSubmit}>
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
                            </form>
                        </form>
                        </Card>
                    </Col>
            
                    <Col span={8}>
                        <Card title="Avaiilable Subjects" bordered={true}>
                        <div>
                        <Table striped hover responsive='sm'>
                        <thead>
                                <tr>

                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => {
                                    return (
                                        <tr>
                                            <td align='center'>{item.Type.toUpperCase()}</td>
                                            <td align='center'>
                                                <h5>EDIT</h5>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            
                        </Table></div></Card>
                    </Col>
                </Row>
            </div>
            </div>
        )
    }
}

export default AddSubject;
