import React from 'react';
import {
  Grid,
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { Route, HashRouter, Switch } from 'react-router-dom';
import Dashboard from 'layouts/Dashboard/Dashboard.jsx';
import AddRole from 'views/AddRole/AddRole.jsx'
import admindashboardRoutes from 'routes/admindashboard.jsx'
import facultydashboardRoutes from 'routes/facultydashboard.jsx'
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
      status: true
    }
  }

  componentWillMount() {
    sessionStorage.clear();
  }

  handleChange1(e) {
    this.setState({ username: e.target.value });
  }

  handleChange2(e) {
    this.setState({ password: e.target.value });
  }
  handleSubmit(e) {

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
        console.log(response.result);
        if (response.result === 'Success') {
          this.setState({
            isAuthenticated: true
          })
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('type', response.data[0].roll_type);
          console.log(response.data[0].roll_type);
          this.props.history.push("/dashboard");
        }
        else {
          this.setState({
            username: '',
            password: '',
            isAuthenticated: false
          })
        }
      });
  }
  render() {
    const { isAuthenticated } = this.state;
    let role= sessionStorage.getItem('type');
    if (isAuthenticated && role=='admin') {
      return (
        <div align='center'>
          <Route path='/dashboard' strict exact component={Dashboard} />
          <HashRouter>
            <Switch>
              {admindashboardRoutes.map((prop, key) => {
                return <Route path={prop.path} strict exact component={prop.component} key={key} />;
              })}
            </Switch>
          </HashRouter>
        </div>
      )
    }
    else if(isAuthenticated && role=='faculty')
    {
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
    else {
      return (

        <div align='center'>
          <Grid fluid>
            <Card
              title="Login"
              content=
              {
                <form onSubmit={this.onSubmit}>
                  Username <input type="text" onChange={this.handleChange1} value={this.state.username} ref="task1"></input>
                  <br></br>
                  <br></br>
                  Password <input type="password" onChange={this.handleChange2} value={this.state.password} ref="task2"></input>
                  <br></br>
                  <br></br>
                  <input type="submit" value="Submit"></input>
                </form>
              }
            />
          </Grid>
        </div>
      )
    }
  }
}
export default Login;
