import React from 'react';
//import { Card } from "components/Card/Card.jsx";
import Sidebar from "components/Sidebar/Sidebar";
import { Grid, Row, Col, Table, Button } from "react-bootstrap"
import Card from "components/Card/Card.jsx";


class AddProgram extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.handleSubmit.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            branch: '',
            items: [],
            text: '',
            allprograms: []
        }
    };

    handleChange1(e) {
        this.setState({ text: e.target.value });
    }

    handleChange2(e) {
        this.setState({ allprograms: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        var self = this;
        fetch('http://localhost:8023/program-create', {
            method: 'POST',
            body: JSON.stringify({
                branch: self.refs.task1.value,
                program: self.refs.task2.value

            }),
            headers: { "Content-Type": "application/json" }

        }).then(response => response.json())
            .then(response => {
                
                if (response.result === 'Success') {
                    var newStateArray = this.state.items.slice();
                    var obj =
                    {
                        branch: response.data.branch,
                        program: response.data.program 
                    }
                    var index = newStateArray.findIndex(val => val.branch == obj.branch)
                    console.log(obj)
                    if(index != -1){
                        newStateArray[index] = obj 
                    }
                    else if(index == -1)
                    {
                        newStateArray.push(obj)
                    }
                    this.setState({ items: newStateArray, text: '', allprograms: [] })
                    console.log(response)   
                }
            });
    }

    componentDidMount() {
        fetch("http://localhost:8023/findAll-program")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result
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
            <div align="center">
                <Sidebar {...this.props} />
                <div id="main-panel" className="main-panel" ref="mainPanel">
                <Col md={12}>
                    <Card
                        title="ADD PROGRAMS"
                        category="AVAILABLE BRANCHES & PROGRAMS"
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>

                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr>
                                            <td align="center">
                                                {item.branch.toUpperCase()}
                                            </td>
                                            <td align="center">
                                                {
                                                    item.program.map(prog => (
                                                        <li>{prog.Year}</li>))
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        }
                    />
                </Col>


                <br></br>
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tr>
                            <td>Branch:</td>
                            <td>
                                <input type="text" required pattern="[A-Za-z]+" onChange={this.handleChange1} value={this.state.text} ref="task1"></input>
                            </td>

                            <br></br>
                            <br></br>
                            <td>
                                Program:
                            </td>
                            <td>
                                <input type="text" min='2000' max='2100' required onChange={this.handleChange2} value={this.state.allprograms} ref="task2"></input>
                            </td>
                        </tr>
                    </table>
                    <br></br>
                    <input type="submit" name="submit" value="Submit"></input>
                </form>
                </div>
            </div>
        )
    }
}
export default AddProgram;


