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

export class StudentDetails extends Component {
    render() {
        return (
            <div>
                <Sidebar {...this.props} />
                <h1>Ethe thoda problem ahe</h1>

            </div>
        )
    }
}

export default StudentDetails
