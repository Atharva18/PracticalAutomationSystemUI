import React from 'react';
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import {
    Form, Input, Select, Button, Row, Card, message, Modal, Icon, Upload
} from 'antd';
import "antd/dist/antd.css";
import reqwest from 'reqwest';

import { Table } from "react-bootstrap"

const confirm = Modal.confirm;

function generatestatement() {

    console.log(this.state.allocated)

    if (this.state.allocated == false && this.state.changes == 0) {
        var size = this.state.size;
        console.log(size);
        if (size == 0) {

        }
        else {

            var no = 0
            if (this.state.request == true) {
                while (true) {
                    var random_num = Math.floor((Math.random() * size) + 1);
                    random_num = random_num - 1;
                    var statement = this.state.statements[random_num].statement

                    if (this.state.statement != statement) {
                        no = 1;
                        break;
                    }
                }
            }
            else {
                no = 0
                var random_num = Math.floor((Math.random() * size) + 1);
                random_num = random_num - 1;
                var statement = this.state.statements[random_num].statement

            }

            fetch('http://localhost:8023/add-student-topic', {
                method: 'POST',
                body: JSON.stringify({
                    id: sessionStorage.getItem('id'),
                    course: sessionStorage.getItem('examsubject'),
                    statement: statement,
                    changes: no
                }),
                headers: { "Content-Type": "application/json" }
            }).then(response => response.json())
                .then(response => {
                    // console.log(response.result);
                    if (response.result === 'Success') {
                        this.setState(
                            {
                                statement: statement,
                                allocated: true
                            }
                        )
                        console.log('Allocated')
                    }
                });




        }

    }

}

function requestchange() {
    fetch('http://localhost:8023/find-student-topic', {
        method: 'POST',
        body: JSON.stringify({
            course: sessionStorage.getItem('examsubject'),
            id: sessionStorage.getItem('id')
        }),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(response => {
            console.log(response.data);
            if (response.result === 'Success') {
                if (response.data.changes == 0) {
                    this.setState(
                        {
                            allocated: false,
                            statement: response.data.statement,
                            request: true

                        }
                    )

                    { generatestatement.call(this) }
                    message.success('Statement changed!')
                    console.log(this.state.allocated)
                    console.log(this.state.statement)
                }
                else {
                    this.setState(
                        {
                            changes: response.data.changes
                        }
                    )
                    message.warning('You have exceeded number of changes')
                }
            }
            else if (response.result === 'Failure') {
            }
            else if (response.result === 'No statement allocated') {
            }
        });
}



class ViewStatements extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.onOk= this.on.bind(this);
        this.state = {

            statements: [],
            size: 0,
            statement: "",
            allocated: false,
            changes: 0,
            request: false,
            fileList: [],
            uploading: false

        }

    };


    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });

        var batchname = localStorage.getItem('batchname')
        var username = sessionStorage.getItem('username')
        console.log(username + "" + batchname)
        fetch(`http://localhost:8023/upload-code/${batchname}/${username}`, {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(response => {
                console.log(response.body);
            });

        console.log(username + "" + batchname)
        console.log(fileList)
        reqwest({
            url: 'http://localhost:8023/upload-code',
            method: 'post',
            processData: false,
            data: formData,
            username: username,
            batchname: batchname,
            success: () => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                message.success('Upload successful!');
            },
            error: () => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                message.success('Upload successful!');
            },
        });
    }

    handleSubmit(e) {
        console.log('handlesubmit')
        confirm({
            title: 'Are you sure you want to change the statement?',
            okText: 'Yes',
            cancelText: 'No',
            content: 'This action cannot be reversed',
            onOk: () => {
                { requestchange.call(this) }
            },
            onCancel: () => { },
        });
    }

    componentDidMount() {

        var subject = sessionStorage.getItem('examsubject')
        var id = sessionStorage.getItem('id')

        fetch('http://localhost:8023/find-stmt', {
            method: 'POST',
            body: JSON.stringify({
                course: subject,

            }),
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json())
            .then(response => {
                // console.log(response);
                if (response.result === 'Success') {
                    this.setState(
                        {
                            statements: response.data,
                            size: response.data.length

                        }
                    )
                    console.log(this.state.statements);
                    console.log(this.state.size);
                }
                else if (response.result === 'Failure') {

                }
                else if (response.result === 'No problem statements added') {

                }
            });


        fetch('http://localhost:8023/find-student-topic', {
            method: 'POST',
            body: JSON.stringify({
                course: subject,
                id: id
            }),
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json())
            .then(response => {
                console.log(response.data);
                if (response.result === 'Success') {
                    this.setState(
                        {
                            allocated: true,
                            statement: response.data.statement,

                        }
                    )
                    console.log(this.state.allocated)
                    console.log(this.state.statement)


                }
                else if (response.result === 'Failure') {

                }
                else if (response.result === 'No statement allocated') {

                }
                { generatestatement.call(this) }
            });



    }

    render() {

        const { uploading } = this.state;
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        };




        /*  var ts= new Date().getTime()/1000
          console.log(ts)
    
          var date= "2019-05-01"
          var date1=date+" "+"00:00:00"
          var ts= Date.parse(date1)/1000
          console.log(ts)*/

        if (this.state.size == 0) {
            return (
                <div align="center">
                    <Sidebar {...this.props} />
                    <Sidebar {...this.props} />
                    <div id="main-panel" className="main-panel" ref="mainPanel">
                        <Header {...this.props} />
                        <div>
                            <h3> No statement allocated</h3>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div align="center">
                <Sidebar {...this.props} />
                <Sidebar {...this.props} />
                <div id="main-panel" className="main-panel" ref="mainPanel">
                    <Header {...this.props} />


                    <br></br>
                    <h3>Allocated Statement is :</h3>
                    <h3> {this.state.statement} </h3>

                    <br>
                    </br> <br>
                    </br> <br>
                    </br>
                    <Table size='sm'>
                        <tbody>

                            <tr>
                                <td align='center'>

                                    <br></br>
                                    <Button type="primary" onClick={this.handleSubmit}> Request Change
                                    </Button>
                                    <br></br>
                                    <br></br>
                                    <Upload {...props}>
                                        <Button>
                                            <Icon type="upload" /> Select File
                                         </Button>
                                    </Upload>
                                    <br></br>
                                    <Button
                                        className="upload-demo-start"
                                        type="primary"
                                        onClick={this.handleUpload}
                                        disabled={this.state.fileList.length === 0}
                                        loading={uploading}
                                    >
                                        {uploading ? 'Uploading' : 'Start Upload'}
                                    </Button>
                                </td>

                                <td>

                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

            </div>
        )
    }
}




export default ViewStatements;


