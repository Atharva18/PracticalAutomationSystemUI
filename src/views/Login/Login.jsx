import React from 'react';
import {
  Grid,
  Image,
  Button,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,

} from "react-bootstrap";
import Background from '../../assets/img/pcce.png';
import { Card } from "components/Card/Card.jsx";
import { Route, HashRouter, Switch } from 'react-router-dom';
import Dashboard from 'layouts/Dashboard/Dashboard.jsx';
import admindashboardRoutes from 'routes/admindashboard.jsx'
import facultydashboardRoutes from 'routes/facultydashboard.jsx'
import proctordashboardRoutes from 'routes/proctordashboard.jsx'
import studentdashboardRoutes from 'routes/studentdashboard.jsx'

import PropTypes from 'prop-types';
import {
  Modal, message
} from 'antd';
import "antd/dist/antd.css";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      username: '',
      password: '',
      isAuthenticated: false,

    }
  }

  componentWillMount() {
    // sessionStorage.clear();
  }

  handleChange1(e) {
    this.setState({ username: e.target.value });
  }

  handleChange2(e) {
    this.setState({ password: e.target.value });
  }
  handleSubmit(e) {

    e.preventDefault();

    var username = this.refs.task1.value;
    var password = this.refs.task2.value;

    var self = this;
    fetch('http://localhost:8023/findType', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.result === 'Success') {
          this.setState({
            isAuthenticated: true
          })
          message.success('Logged in successfully!')
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('id', response.data[0].id);
          sessionStorage.setItem('type', response.data[0].Type);
          sessionStorage.setItem('isAuth', true);
          console.log(response.data[0].Type);
          console.log(response.data[0].id);
          this.props.history.push("/dashboard");
        }
        else {
          message.error('Incorrect username or password!')
          this.setState({
            username: '',
            password: '',
            isAuthenticated: false
          })

        }
      });
  }
  render() {
    const isAuthenticated = sessionStorage.getItem('isAuth');
    let role = sessionStorage.getItem('type');
    const divStyle = {
      height: '100%',
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover'
    };


    if (isAuthenticated && role == 'admin') {

      // message.success('Success!')

      return (
        <div align='center'>

          <Route path='/dashboard' strict exact component={Dashboard} />

          <HashRouter>
            <Switch>
              {admindashboardRoutes.map((prop, key) => {
                return <Route strict exact path={prop.path} component={prop.component} key={key} />;
              })}
            </Switch>
          </HashRouter>
        </div>
      )
    }
    else if (isAuthenticated && role == 'faculty') {
      //message.success('Success!')
      return (
        <div align='center'>
          <Route path='/dashboard' strict exact component={Dashboard} />
          <HashRouter>
            <Switch>
              {facultydashboardRoutes.map((prop, key) => {
                return <Route path={prop.path} strict exact component={prop.component} key={key} />;
              })}
            </Switch>
          </HashRouter>
        </div>
      )
    }
    else if (isAuthenticated && role == 'proctor') {
      //message.success('Success!')
      return (
        <div align='center'>
          <Route path='/dashboard' strict exact component={Dashboard} />
          <HashRouter>
            <Switch>
              {proctordashboardRoutes.map((prop, key) => {
                return <Route path={prop.path} strict exact component={prop.component} key={key} />;
              })}
            </Switch>
          </HashRouter>
        </div>
      )
    }
    else if (isAuthenticated && role == 'user') {
      //message.success('Success!')
      return (
        <div align='center'>
          <Route path='/dashboard' strict exact component={Dashboard} />
          <HashRouter>
            <Switch>
              {studentdashboardRoutes.map((prop, key) => {
                return <Route path={prop.path} strict exact component={prop.component} key={key} />;
              })}
            </Switch>
          </HashRouter>
        </div>
      )

    }
    else {
      return (
        <div align='center' style={divStyle}>
         <Grid style={{ paddingTop: "50px", width: "40%", height: "60%" }}>
            <Card style={{ width: '20rem' }}
              title="LOGIN"
              content=
              {
                <Form >
                  <form onSubmit={this.onSubmit}>
                    <ControlLabel style={{ color: 'black' }}>Username</ControlLabel>
                    <br></br>
                    <input type="text" required onChange={this.handleChange1} value={this.state.username} ref="task1"></input>
                    <br></br>
                    <br></br>
                    <ControlLabel style={{ color: 'black' }}>Password</ControlLabel>
                    <br></br>
                    <input type="password" required onChange={this.handleChange2} value={this.state.password} ref="task2"></input>
                    <br></br>
                    <br></br>
                    <Button style={{ color: 'black' }} type="submit" name="submit" value="Submit">SUBMIT</Button>
                  </form>
                </Form>
              }
            />
          </Grid>
        </div>
          
          )
        }
      }
    }
    
    
    export default Login;
    /*
    



          */