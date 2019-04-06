import React from 'react'

import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import { Grid, Row, Col, Table, Button } from "react-bootstrap"
import Card from "components/Card/Card.jsx";

class ViewStudents extends React.Component {
  constructor(props) {
    super(props);

  }

  render()
  {
      return(

      
        <div align="left">
        <Sidebar {...this.props} />
        <Sidebar {...this.props} /> 
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header {...this.props} />

       
        </div>
        </div>
      )
  }
}

export default ViewStudents