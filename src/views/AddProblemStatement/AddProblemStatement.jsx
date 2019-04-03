import React from 'react';
//import { Card } from "components/Card/Card.jsx";
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import { Grid, Row, Col, Table,Button } from "react-bootstrap"

import Card from "components/Card/Card.jsx";
import PropTypes from 'prop-types';
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
                if (response.result === 'Success') {

                    alert('Added Succesfully');
                }
            });
    }
    
    
    render() {
        const { error, isLoaded, items } = this.state;
        var subject=localStorage.getItem('subject');
        return (
            <div align="left">
                <Sidebar {...this.props} />
                <Sidebar {...this.props} />
                <div id="main-panel" className="main-panel" ref="mainPanel">
                <Header {...this.props} />
                <Col md={12}>
                    <Card
                        title="ADD Problem Statement"
                        ctTableFullWidth
                        ctTableResponsive
                        content={

                            <form onSubmit={this.onSubmit}>
                            <div align="center">
                            Subject:<input type="text" required pattern='[A-Za-z]+' value={subject}   ></input>
                            <br></br>
                            <br></br>
                            Statement:<input type="text" onChange={this.handleChange} ></input>
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
