import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import {
  message, Modal
} from 'antd';
import "antd/dist/antd.css";
const confirm = Modal.confirm;

class HeaderLinks extends Component {


  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      
      <div>
        <Nav>
         
          <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>Students Added</MenuItem>
            <MenuItem eventKey={2.2}>Role created</MenuItem>
            <MenuItem eventKey={2.3}>Exams created</MenuItem>
            <MenuItem eventKey={2.3}>Exams created</MenuItem>
            <MenuItem eventKey={2.3}>Exams created</MenuItem>
          </NavDropdown>
         
        </Nav>
        <Nav pullRight>
          
         
          <NavItem eventKey={3} onClick=
          {
            ()=>{

              confirm({
                title: 'Are you sure you want to logout?',
                okText:'Yes',
                cancelText:'No', 
                onOk() {
                  return new Promise((resolve, reject) => {
                    //setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                    message.success('You are successfully logged out!')
                    sessionStorage.clear();
                    document.location.href = "/"; 
                   
                  }).catch(() => console.log('Oops errors!'));
                },
                onCancel() {

                  

                },
              });

             
            }
          }>
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}



export default HeaderLinks;
