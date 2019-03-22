import React, { Component } from 'react'
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import "antd/dist/antd.css";
import { Table } from "react-bootstrap"
import { Route, HashRouter, Switch } from 'react-router-dom';
import {
    Form, Input, Select, Button, Row, Col, Card
} from 'antd';
import { Anchor } from 'antd';
import {
    BrowserRouter as Router,
    
    Link
} from 'react-router-dom';
import Enrollment from "views/Enrollment/Enrollment";
import { createHashHistory } from 'history'

// const { Link } = Anchor;
const Option = Select.Option;
export const history = createHashHistory()
export class CreateExam extends Component {
    constructor(props) {
        super(props);
         this.handleSubmit1 = this.handleSubmit1.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            text: '',
            branch: '',
        sem: '',
        year: '',
        key: 'tab1'
            
        }
    };

   

    handleSubmit1 (e){
        e.preventDefault();
        alert('hi ')
        localStorage.setItem('branch',this.state.branch);
        localStorage.setItem('year',this.state.year);

        history.push({
            pathname: '/Enrollment',
          })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('IN submit');
        fetch('http://localhost:8023/findSubject', {
            method: 'POST',
            body: JSON.stringify({
                branch: this.state.branch,
                sem: this.state.sem,
                year: this.state.year,
            }),
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json())
        .then(response => {
                console.log(response.result);
                if (response.result === 'Success') {
                    this.setState({
                        isLoaded: true,
                        items: response.data
                    });
                    alert(this.state.items);
                }
                else {
                    alert(response.result);
                }
            });
    }

    handleChangeSelect = (e) => {
        this.setState({ sem: e.label });
        //alert(e.label);
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

    render() {
        const { error, isLoaded, items } = this.state;
        return (
            <div>
                <Sidebar {...this.props} />
                <Row>
                    <Col span={12} offset={6} >
                        <Card title="Create Exam" bordered={true} style={{ padding: '30px', width: '80%', margin: '30px', height: '90%' }}>
                            
                             <form onSubmit={this.handleSubmit}>
                            Branch:<Select labelInValue defaultValue={{ key: 'Branch' }} onChange={this.handleChangeSelect2} style={{ width: 120 }} name="branch">
                                        <Option value="Computer">Computer</Option>
                                        <Option value="IT">IT</Option>
                                        <Option value="ENTC">ENTC</Option>
                                    </Select><br /><br />
                                    Semester:<Select labelInValue defaultValue={{ key: 'Semester' }} onChange={this.handleChangeSelect} style={{ width: 120 }} name="sem">
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                        <Option value="4">4</Option>
                                        <Option value="5">5</Option>
                                        <Option value="6">6</Option>
                                        <Option value="7">7</Option>
                                        <Option value="8">8</Option>
                                    </Select><br /><br />
                                    Year:<Select style={{ width: 120 }} labelInValue defaultValue={{ key: 'Year' }} onChange={this.handleChangeSelect1} name="year">
                                        <Option value="SE">SE</Option>
                                        <Option value="TE">TE</Option>
                                        <Option value="BE">BE</Option>
                                    </Select><br /><br />
                                    <Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.handleSubmit}>
                                        Submit!!
                            </Button>
                                    </form>
                                    <div>
                        
                                {items.map((item) => {
                                    return (
                                        <tr>
                                            <td align='center'>{item.course.toUpperCase()}</td>
                                            <td align='center'>
                                           <Button type="submit" onClick={this.handleSubmit1}>Create Exam</Button>
                                           
                                             {/* <Anchor>
    <Link href="#views-AddRole-AddRole" title="Create Exam" />
                                            </Anchor> 
                                            <Link to="/views/Enrollment/Enrollment"> Create Exam</Link> */}
                                            </td>
                                        </tr>
                                    );
                                })}

                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CreateExam
