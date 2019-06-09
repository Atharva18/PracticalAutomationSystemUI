import React, { Component } from 'react'
import Sidebar from "components/Sidebar/Sidebar";
import {
    Row, Col, Card, DatePicker, Input, Button
} from 'antd';
import { createHashHistory } from 'history'
import Enrollment from "views/Enrollment/Enrollment";
export const history = createHashHistory()
const { MonthPicker, RangePicker} = DatePicker;
var m;
function onChange(date, dateString) {
    console.log(date, dateString);
    m=dateString;
}

export class ConfirmExam extends Component {

    constructor(props) {
        super(props);
         

        this.state = {
            examName:'',
            subject:localStorage.getItem('subject')
        }
    };

    handleChange = (e) => {
        this.setState({ examName: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(this.state.subject)
        console.log(this.state.examName)
        //console.log()
        console.log(m);
        typeof m;
        fetch('http://localhost:8023/exam-create', {
            method: 'POST',
            body: JSON.stringify({
                course: this.state.subject,
                exam_name: this.state.examName,
                date:m
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
            history.push({
                pathname: '/Enrollment',
              })
    
    }

    render() {
        return (
            <div align='left' id="main-panel" className="main-panel" ref="mainPanel">
            <div style={{ padding: '30px', width: '50%', margin: '30px', height: '50%' }}>
                <Sidebar {...this.props} />
                <Row gutter={16}>
                    <Col span={15}>
                        <Card title="Confirm Exam" bordered={true}>
                            <form onSubmit={this.handleSubmit}>
                                <Input type="text" placeholder="Exam Name"  onChange={this.handleChange} /><br /><br />
                                <RangePicker onChange={onChange} />
                                <br /><br />
                                {/* <WeekPicker onChange={onChange} placeholder="Select week" /> <br /><br /> */}
                                <Button type="primary" icon="poweroff" onClick={this.handleSubmit}>
                                    Submit!!
                                </Button>
                            </form>
                        </Card>
                    </Col>
                </Row>
            </div>
            </div>
        )
    }
}

export default ConfirmExam
