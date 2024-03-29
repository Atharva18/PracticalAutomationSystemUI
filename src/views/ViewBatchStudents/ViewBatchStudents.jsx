import React, { Component } from 'react'
import Header from "components/Header/Header";
import "antd/dist/antd.css";
import Sidebar from "components/Sidebar/Sidebar";
import Card from "components/Card/Card.jsx";
import { Grid, Row, Col, Table, Button } from "react-bootstrap"
import { Anchor } from 'antd';
import { createHashHistory } from 'history'

var map1=new Map();
var map2=new Map();
export const history = createHashHistory()

export class ViewBatchStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            batch_name:localStorage.getItem('Batch_Name'),
            subject:localStorage.getItem('SubjectForBacth')


        }
    };

    handleSubmit1 (e){
        e.preventDefault();
        history.push({
           pathname: '/DownloadCodes',
          })
    }

    componentDidMount() {
        alert(this.state.batch_name);
        console.log(this.state.batch_name)
        alert(this.state.subject);
        console.log(this.state.subject)
        fetch('http://localhost:8023/find-batch_students',{
            method: 'POST',
            body: JSON.stringify({
                batch_name: this.state.batch_name,
                subject:this.state.subject
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
                <div align='left' id="main-panel" className="main-panel" ref="mainPanel">
                <Col md={12}>
                    <Card
                        title="AVAILABLE Students"
                        category="AVAILABLE Students"
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                            <Table align='center' striped hover responsive>
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Fname</th>
                                        <th scope="col">Lname</th>
                                    </tr>
                                </thead>

                                <tbody>
                            
                                    {items.map((item,index) => (
                                        <tr>
                                            <td>
                                                {
                                                    item.user.map(prog => (
                                                        <h5>{prog.fname}</h5>))
                                                }
                                            </td>
                                            <td >
                                                {
                                                    item.user.map(prog => (
                                                        <h5>{prog.lname}</h5>))
                                                }
                                                
                                            </td>
                                            <td align='center'>
                                        
                                           <Button type="submit" onClick={this.handleSubmit1}>Download Codes</Button>
                                           
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

export default ViewBatchStudents
