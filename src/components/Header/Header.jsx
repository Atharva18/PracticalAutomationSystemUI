import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

import HeaderLinks from "./HeaderLinks.jsx";

import admindashboardRoutes from "routes/admindashboard.jsx";
import facultydashboardRoutes from "routes/facultydashboard.jsx";
import proctordashboardRoutes from "routes/proctordashboard.jsx";
import studentdashboardRoutes from "routes/studentdashboard.jsx";


class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  getBrand() {
    var name;
    let role= sessionStorage.getItem('type');
    if(role=='admin')
    {
    admindashboardRoutes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    }else if (role=='faculty')
    {

      facultydashboardRoutes.map((prop, key) => {
        if (prop.collapse) {
          prop.views.map((prop, key) => {
            if (prop.path === this.props.location.pathname) {
              name = prop.name;
            }
            return null;
          });
        } else {
          if (prop.redirect) {
            if (prop.path === this.props.location.pathname) {
              name = prop.name;
            }
          } else {
            if (prop.path === this.props.location.pathname) {
              name = prop.name;
            }
          }
        }
        return null;
      });
    }
    else if(role=='proctor')
    {
      proctordashboardRoutes.map((prop, key) => {
        if (prop.collapse) {
          prop.views.map((prop, key) => {
            if (prop.path === this.props.location.pathname) {
              name = prop.name;
            }
            return null;
          });
        } else {
          if (prop.redirect) {
            if (prop.path === this.props.location.pathname) {
              name = prop.name;
            }
          } else {
            if (prop.path === this.props.location.pathname) {
              name = prop.name;
            }
          }
        }
        return null;
      });
    }
    else if(role=='user')
    {
      studentdashboardRoutes.map((prop, key) => {
        if (prop.collapse) {
          prop.views.map((prop, key) => {
            if (prop.path === this.props.location.pathname) {
              name = prop.name;
            }
            return null;
          });
        } else {
          if (prop.redirect) {
            if (prop.path === this.props.location.pathname) {
              name = prop.name;
            }
          } else {
            if (prop.path === this.props.location.pathname) {
              name = prop.name;
            }
          }
        }
        return null;
      });
    }
    return name;
  }
  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/dashboard">{this.getBrand()}</a>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <HeaderLinks />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
