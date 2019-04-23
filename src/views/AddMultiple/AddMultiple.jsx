import React from 'react';
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import { Grid, Row, Col, Table, Button } from "react-bootstrap"

function addstudents() {

    if (this.state.items.length > 0) { alert('Called!'); }

    fetch('http://localhost:8023/addfrom-csv', {
        method: 'POST',
        body: JSON.stringify({

        }),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(response => {
            console.log(response.body);
            if (response.result === 'Success') {
                alert('Exported successfully!');
            }
            else if (response.result === 'Failure') {
                alert(response.result);
            }
        });



}


class AddMultiple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            file: null,
            isLoaded: false,
            items: []
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault()
        this.fileUpload(this.state.file).then((response) => {
            console.log("File uploaded");
        })
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    fileUpload(file) {
        const formData = new FormData();
        formData.append('file', file);
        const url = 'http://localhost:8023/csv-preview';
        const config = {
            method: 'POST',
            body: formData,
            mode: 'cors'
        };
        return fetch(url, config, formData)
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result)
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
            <div align="left">
                <div align='left' id="main-panel" className="main-panel" ref="mainPanel">
                    <Sidebar {...this.props} />
                    <Header {...this.props} />
                    <div align='center'>
                        <form onSubmit={this.onFormSubmit}>
                            <label>Select a file:</label>
                            <input type="file" accept=".csv" onChange={this.onChange} />
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                    <div>
                        <Table striped hover responsive='sm'>
                            <thead class="thead-dark">
                                <tr>

                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Roll Type</th>
                                    <th scope="col">Branch</th>
                                    <th scope="col">Year</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map(item => (
                                        <tr>
                                            <td>
                                                {item.fname}
                                            </td>
                                            <td>
                                                {item.lname}
                                            </td>
                                            <td>
                                                {item.email}
                                            </td>
                                            <td>
                                                {item.username}
                                            </td>
                                            <td>
                                                {item.roll_type}
                                            </td>
                                            <td>
                                                {item.branch}
                                            </td>
                                            <td>
                                                {item.year}
                                            </td>
                                        </tr>
                                    ))}

                            </tbody>

                        </Table>

                        <div align='center'>
                            <Button onClick={addstudents.bind(this)} align='center'>SUBMIT</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddMultiple;