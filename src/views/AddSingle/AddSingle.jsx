import React from 'react';

import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,message
} from 'antd';
import 'antd/dist/antd.css'
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
const { Option } = Select;


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    roles: [],
    email: '',
    password: '',
    username: '',
    firstname: '',
    lastname: '',
    role: '',
    department: '',
    branch: ''
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('IN submit');
    fetch('http://localhost:8023/user-create', {
      method: 'POST',
      body: JSON.stringify({
        fname:this.state.firstname,
        lname:this.state.lastname,
        email:this.state.email,
        username:this.state.username,
        password:this.state.password,
        roll_type:this.state.role.toLowerCase(),
        status:'Active',
        login_timestamp:'',
        logout_timestamp:'',
        login_attempts:''
      }),
      headers: { "Content-Type": "application/json" }
  }).then(response => response.json())
      .then(response => {
          console.log(response.body);
          if (response.result === 'Success') {

             //alert(response.result);
             message.success('User added successfully')
          }
          else
          {
            //alert(response.result);
            message.error('Error adding user')
          }
      });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log('hello');
  }
  handleChangeSelect = (e) => {
    this.setState({role: e.label });
    console.log(e.label);
  }
  componentDidMount() {
    fetch("http://localhost:8023/findAll-role")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            roles: result.data
          });
        },
        (error) => {
          console.log("In Error");
          this.setState({

            error
          });
        }
      )
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 10 },
        sm: { span: 10, offset: 0, },
      },
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 10, offset: 0, },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 10,

        },
        sm: {
          span: 10,
          offset: 12,
        },
      },
    };

    return (
      <div align='left'>
        <div align='left' id="main-panel" className="main-panel" ref="mainPanel">
          <Sidebar {...this.props} />
         
          <Header {...this.props} />
          <br></br>

          <Form align='left' {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item
              label="First Name"
            >
              {getFieldDecorator('firstname', {
                rules: [{
                  type: 'text', message: 'The input is not valid!'
                }, {
                  required: true, message: 'Please input your first name!',
                }]
              })(
                <Input
                  onChange={this.handleChange}
                  setFieldsValue={this.state.firstname}
                  name='firstname'
                />
              )}
            </Form.Item>
            <Form.Item
              label="Last Name"
            >
              {getFieldDecorator('lastname', {
                rules: [{
                  type: 'text', message: 'The input is not valid'
                }, {
                  required: true, message: 'Please input your last name',
                }]
              })(
                <Input
                  onChange={this.handleChange}
                  setFieldsValue={this.state.lastname}
                  name='lastname'
                />
              )}
            </Form.Item>
            <Form.Item
              label="E-mail"
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!'
                }, {
                  required: true, ref: 'task', message: 'Please input your E-mail!',
                }]
              })(
                <Input
                  onChange={this.handleChange}
                  setFieldsValue={this.state.email}
                  name='email'
                />
              )}
            </Form.Item>

            <Form.Item
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  type:'password',
                }],
              })(
                <Input type="password" 
                onChange={this.handleChange}
                setFieldsValue={this.state.password}
                  name='password'/>
              )}
            </Form.Item>
            <Form.Item
              label="Username"
              
            >
              {getFieldDecorator('username', {
                rules: [{
                  type: 'text', message: 'The input is not valid!'
                }, {
                  required: true, message: 'Please input a username!',
                }]
              })(
                <Input
                  onChange={this.handleChange}
                  setFieldsValue={this.state.username}
                  name='username'
                />
              )}
            </Form.Item>

            <Form.Item
              label="Role-Type"
            >
              {getFieldDecorator('role', {
                rules: [{ required: true }],
              })(
                <Select labelInValue defaultValue={{key:'ADMIN'}}  onChange={this.handleChangeSelect}  >
                  {this.state.roles.map((e, key) => {
                    return <option key={key} value={e.Type}>{e.Type.toUpperCase()}</option>;
                  })}
                </Select>

              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Register</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const AddSingle = Form.create({ name: 'register' })(RegistrationForm);

export default AddSingle