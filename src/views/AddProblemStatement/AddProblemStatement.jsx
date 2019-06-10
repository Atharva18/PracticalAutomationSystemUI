import React from 'react';
//import { Card } from "components/Card/Card.jsx";
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import { Grid, Row, Col, Table,Button } from "react-bootstrap"

import Card from "components/Card/Card.jsx";
import PropTypes from 'prop-types';
import { message } from 'antd';
class AddProblemStatement extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            text: ''
        }
    };

    handleChange(e) {
        this.setState({ text: e.target.value });
    }
    handleSubmit(e) {
        var subject1=localStorage.getItem('subject');
        e.preventDefault();
        var self = this;
        fetch('http://localhost:8023/problem-statement-create', {
            method: 'POST',
            body: JSON.stringify({
                statement:this.state.text,
                course:subject1
            }),
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json())
            .then(response => {
                console.log(response.body);
                message.success('Success!')
                if (response.result === 'Success') {

                   
                }
            });
    }
    
    
    render() {
        const { error, isLoaded, items } = this.state;
        var subject=localStorage.getItem('subject');
        return (
            <div align="left">
                <Sidebar {...this.props} />
                <div align='left' id="main-panel" className="main-panel" ref="mainPanel">
                <Header {...this.props} />
                <Col md={12}>
                    <Card
                        title="ADD Problem Statement"
                        ctTableFullWidth
                        ctTableResponsive
                        content={

                            <form onSubmit={this.onSubmit}>
                            <div align="center">
                            <label>Subject </label>
                            <br></br>
                            <input type="textarea" required pattern='[A-Za-z]+' value={subject}   ></input>
                            <br></br>
                            <br></br>
                            <label>Statement </label>
                            <br></br>
                            <textarea name='message' rows="10" cols="30" onChange={this.handleChange} />
                            <br></br>
                            <br></br>
                            <Button variant="primary" type="submit" name="submit" value="Submit">SUBMIT</Button>
                            </div>
                        </form>
                        
                            
                        }
                    />
                </Col>

                <br></br>
                </div>
            </div>
        )
    }
}

 AddProblemStatement.PropTypes=
{
   text:PropTypes.string.isRequired,
 }


export default AddProblemStatement;
