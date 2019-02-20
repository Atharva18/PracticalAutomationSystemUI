import React from 'react';
//import { Card } from "components/Card/Card.jsx";
import Sidebar from "components/Sidebar/Sidebar";


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
                program: { Year: self.refs.task2.value }

            }),
            headers: { "Content-Type": "application/json" }

        }).then(response => response.json())
            .then(response => {
                if (response.result === 'Success') {
                    var newStateArray = this.state.items.slice();
                    var obj =
                    {
                        branch: response.data.branch,
                        program: {Year:response.data.program}
                    }
                    newStateArray.push(obj);
                    this.setState({ items: newStateArray, text: '' })

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
                <h3>Available Programs</h3>
                <table>
                    <tr>
                        <th>
                            <h3>Branch</h3>
                        </th>
                        <th>
                            <h3>Programmes</h3>
                        </th>
                    </tr>

                    {items.map(item => (
                        <tr>
                            <td>
                                {item.branch}
                            </td>
                            <td>
                                {
                                    item.program.map(prog => (
                                    <li>{prog.Year}</li>))
                                }
                            </td>
                        </tr>
                    ))}

                </table>
                <br></br>
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tr>
                            <td>Branch:</td>
                            <td>
                                <input type="text" onChange={this.handleChange1} value={this.state.text} ref="task1"></input>
                            </td>

                            <br></br>
                            <br></br>
                            <td>
                                Program:
                            </td>
                            <td>
                                <input type="text" onChange={this.handleChange2} value={this.state.allprograms} ref="task2"></input>
                            </td>
                        </tr>
                    </table>
                    <br></br>
                    <input type="submit" name="submit" value="Submit"></input>
                </form>
            </div>
        )
    }
}
export default AddProgram;


