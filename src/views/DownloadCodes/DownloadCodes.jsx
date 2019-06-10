import React, { Component } from 'react'
import Header from "components/Header/Header";
import "antd/dist/antd.css";
import Sidebar from "components/Sidebar/Sidebar";
import Card from "components/Card/Card.jsx";
import { Grid, Row, Col, Table, Button } from "react-bootstrap"
import { Anchor } from 'antd';
import { createHashHistory } from 'history'

export const history = createHashHistory()

export class DownloadCodes extends Component {

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
        var batch_name=localStorage.getItem('Batch_Name');
        fetch(`http://localhost:8023/download-zip/${batch_name}`,{
            //method: 'GET',
            // body: JSON.stringify({
            //     batch_name: this.state.batch_name,
            // }),
            // headers: { "Content-Type": "application/json" }
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
                <Button type="submit" onClick={this.handleSubmit1}>Download Codes</Button>
            </div>
        )              
    }
}

export default DownloadCodes
