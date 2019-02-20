import React from 'react';
import {
  Grid,
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { Route, HashRouter, Switch } from 'react-router-dom';
import Dashboard from 'layouts/Dashboard/Dashboard.jsx';
import AddRole from 'views/AddRole/AddRole.jsx'

import admindashboardRoutes from 'routes/admindashboard.jsx'
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
      status: true


    }
  };

  /*function route(props) {

      if(this.state.status==false)
      {
        alert('HERE!')
      return null;
      }
      this.setState(
        {
          state:false
        }
      )
      return (
        <div>
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

*/


  handleChange1(e) {
    this.setState({ username: e.target.value });
  }

  handleChange2(e) {
    this.setState({ password: e.target.value });
  }
  handleSubmit(e) {

    var username = this.refs.task1.value;
    var password = this.refs.task2.value;

    if (username === 'Admin' && password === '123') {
      this.setState({
        username: '',
        password: ''
      })
      this.props.history.push("/dashboard");
    }
    else {
      this.setState({
        username: '',
        password: ''
      })
    }

  }
  render() {



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
export default Login;


