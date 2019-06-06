import React, { Component } from 'react'
import Header from "components/Header/Header";
import "antd/dist/antd.css";
import Sidebar from "components/Sidebar/Sidebar";
import Card from "components/Card/Card.jsx";
import { Grid, Row, Col, Table, Button } from "react-bootstrap"
import { Anchor } from 'antd';
import { createHashHistory } from 'history'

var map1=new Map();
export const history = createHashHistory()

export class ViewBatches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            subject:localStorage.getItem('Exam_Name')
        }
    };

    handleSubmit1 (e){
        e.preventDefault();
        var key=parseInt(e.target.id,10);
        console.log(map1.get(key));
        var element=map1.get(key);
        alert(element);
        localStorage.setItem('Batch_Name',element);
        history.push({
           pathname: '/ViewBatchStudents',
          })
    }

    componentDidMount() {
        fetch("http://localhost:8023/find-batch/:exam_name",{
            method: 'POST',
            body: JSON.stringify({
                exam_name: this.state.subject,
            }),
            headers: { "Content-Type": "application/json" }
        })
        
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
                        title="AVAILABLE Batches"
                        category="AVAILABLE Batches"
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                            <Table align='center' striped hover responsive>
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Batch_Name</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {items.map((item,index) => (
                                        <tr>
                                            <td>{item.subject}</td>
                                            <td>{item.name}</td>
                                             <td align='center'>
                                            {map1.set(index,item.name)}
                                           <Button type="submit" onClick={this.handleSubmit1} id={index}>View Students</Button>
                                           
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

export default ViewBatches
