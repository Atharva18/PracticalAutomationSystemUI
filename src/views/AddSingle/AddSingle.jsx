import React from 'react';

import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import 'antd/dist/antd.css'
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

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
    alert(this.state.role);
  
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
                  value={this.state.firstname}
                  name='firstname'
                />
              )}
            </Form.Item>
            <Form.Item
              label="Last Name"
            >
              {getFieldDecorator('lname', {
                rules: [{
                  type: 'text', message: 'The input is not valid'
                }, {
                  required: true, message: 'Please input your last name',
                }]
              })(
                <Input
                  onChange={this.handleChange}
                  value={this.state.lastname}
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
                  value={this.state.email}
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
                  value={this.state.password}
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
                  value={this.state.username}
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