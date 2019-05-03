import React from 'react';
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import { Grid, Row, Col, Table, Button } from "react-bootstrap"
import { PageHeader } from 'antd';
import Card from "components/Card/Card.jsx";
import PropTypes from 'prop-types';

class Malpractices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      items: [],
      isLoaded: false
    }

  };


  async componentDidMount() {

    try {

      setInterval(async () => {
        fetch("http://localhost:8023/findAll-role")
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result);

              if (this.state.isLoaded == false) {
                this.setState({
                  isLoaded: true,
                  items: result.data
                });
              }
              else {
                this.setState({
                  isLoaded: false,
                  items: result.data
                });
              }
              // this.forceUpdate();
              console.log(this.state.isLoaded)
            },
            (error) => {
              console.log("In Error");
            }
          )
      }, 3000);
    }
    catch (e) {

    }
  }
  render() {

    if(this.state.isLoaded==true)
    {
      return(
        <div>
          True
        </div>
      )
    }
    else
    {
      return(
        <div>

          false
          </div>
      )
    }


    return (
      <div align="left">
        <Sidebar {...this.props} />
        <Sidebar {...this.props} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
        {console.log('Here')}
          <h1>jello {this.state.isLoaded}</h1>
        </div>
      </div>
    )
  }
}


export default Malpractices;


