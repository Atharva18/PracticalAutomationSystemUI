import React, { Component } from 'react'
import Sidebar from "components/Sidebar/Sidebar";
import Card from "components/Card/Card.jsx";
import { Grid, Row, Col, Table, Button } from "react-bootstrap"
import { Anchor } from 'antd';
import { createHashHistory } from 'history'

var map1=new Map();

const { Link } = Anchor;
export const history = createHashHistory()
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

    handleSubmit1 (e){
        e.preventDefault();
        var key=parseInt(e.target.id,10);
        console.log(map1.get(key));
        var element=map1.get(key);
        alert(element);
        localStorage.setItem('Exam_Name',element);
        history.push({
            pathname: '/ViewBatches',
          })
    }

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
                <div align='left' id="main-panel" className="main-panel" ref="mainPanel">
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
                                    {items.map((item,index) => (
                                        <tr>
                                            {/* <Anchor>
                                            <Link href="#views-AddMultiple-AddMultiple.jsx" title={item.course}/></Anchor> */}
                                            <td>{item.course}</td>
                                            <td>{item.exam_name}</td>
                                            
                                            <td>{item.start_date}</td>
                                            <td>{item.end_date}</td>
                                            <td>{item.status}</td>
                                            <td align='center'>
                                            {map1.set(index,item.exam_name)}
                                           <Button type="submit" onClick={this.handleSubmit1} id={index}>View Exam</Button>
                                           
                                            </td>
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
