import React from 'react';
//import { Card } from "components/Card/Card.jsx";
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import { Grid, Row, Col, Table ,Button} from "react-bootstrap"
import { PageHeader,message } from 'antd';
import Card from "components/Card/Card.jsx";
import PropTypes from 'prop-types';
class AddRole extends React.Component {
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
        e.preventDefault();
        var self = this;
        fetch('http://localhost:8023/role-create', {
            method: 'POST',
            body: JSON.stringify({
                Type: self.refs.task.value
            }),
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json())
            .then(response => {
                console.log(response.body);
                if (response.result === 'Success') {

                    var newStateArray = this.state.items.slice();
                    var obj =
                    {
                        Type: response.data
                    }
                    newStateArray.push(obj);
                    this.setState({ items: newStateArray, text: '' })
                    message.success('Role created successfully')
                }
            });
    }

    componentDidMount() {

        fetch("http://localhost:8023/findAll-role")
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
       
        return (
            <div align="left">
                <Sidebar {...this.props} /> 
                
                <div align='left'id="main-panel" className="main-panel" ref="mainPanel">
                <Header {...this.props} />
                    <Col md={12}>
                        <Card
                            title="ADD ROLE"
                            category="AVAILABLE ROLES"
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                                <Table striped hover responsive='sm'>
                                    <thead>
                                        <tr>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(this.state.items)}
                                        {this.state.items.map((item) => {
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
                                </Table>
                            }
                        />
                    </Col>

                    <br></br>
                    <form onSubmit={this.onSubmit}>
                        <div align="center">
                            <input type="text" required pattern='[A-Za-z]+' onChange={this.handleChange} value={this.state.text} ref="task"></input>
                            <br></br>
                            <br></br>
                            <Button variant="primary" type="submit" name="submit" value="Submit">SUBMIT</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

AddRole.PropTypes =
    {
        text: PropTypes.string.isRequired,
    }


export default AddRole;


