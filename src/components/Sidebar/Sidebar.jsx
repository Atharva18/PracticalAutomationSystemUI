import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import HeaderLinks from "../Header/HeaderLinks.jsx";

import imagine from "assets/img/sidebar-3.jpg";
//import logo from "assets/img/reactlogo.png";

import admindashboardRoutes from "routes/admindashboard.jsx";
import facultydashboardRoutes from "routes/facultydashboard.jsx";
import proctordashboardRoutes from "routes/proctordashboard.jsx";
import studentdashboardRoutes from "routes/studentdashboard.jsx";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    const sidebarBackground = {
    //  backgroundImage: "url(" + imagine + ")"
    };

    let role =sessionStorage.getItem('type');

    if(role=='admin')
    {
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color="black"
        data-image={imagine}
      >
        <div className="sidebar-background" style={sidebarBackground} />
        <div className="logo">
          
          <h3>
            PCCOE ADMIN
          </h3>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <HeaderLinks /> : null}
    
            {admindashboardRoutes.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : this.activeRoute(prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}
          </ul>
        </div>
      </div>
    );}
    else if(role=='faculty')
    {
      return (
        <div
          id="sidebar"
          className="sidebar"
          data-color="black"
          data-image={imagine}
        >
          <div className="sidebar-background" style={sidebarBackground} />
          <div className="logo">
            
            <h3>
              PCCOE FACULTY
            </h3>
          </div>
          <div className="sidebar-wrapper">
            <ul className="nav">
              {this.state.width <= 991 ? <HeaderLinks /> : null}
      
              {facultydashboardRoutes.map((prop, key) => {
                if (!prop.redirect)
                  return (
                    <li
                      className={
                        prop.upgrade
                          ? "active active-pro"
                          : this.activeRoute(prop.path)
                      }
                      key={key}
                    >
                      <NavLink
                        to={prop.path}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                  );
                return null;
              })}
            </ul>
          </div>
        </div>
      );
    }
    else if(role=='proctor')
    {
      return (
        <div
          id="sidebar"
          className="sidebar"
          data-color="black"
          data-image={imagine}
        >
          <div className="sidebar-background" style={sidebarBackground} />
          <div className="logo">
            
            <h3>
              PCCOE PROCTOR
            </h3>
          </div>
          <div className="sidebar-wrapper">
            <ul className="nav">
              {this.state.width <= 991 ? <HeaderLinks /> : null}
      
              {proctordashboardRoutes.map((prop, key) => {
                if (!prop.redirect)
                  return (
                    <li
                      className={
                        prop.upgrade
                          ? "active active-pro"
                          : this.activeRoute(prop.path)
                      }
                      key={key}
                    >
                      <NavLink
                        to={prop.path}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                  );
                return null;
              })}
            </ul>
          </div>
        </div>
      );
    }
    else if(role=='student')
    {
      return (
        <div
          id="sidebar"
          className="sidebar"
          data-color="black"
          data-image={imagine}
        >
          <div className="sidebar-background" style={sidebarBackground} />
          <div className="logo">
            
            <h3>
              PCCOE STUDENT
            </h3>
          </div>
          <div className="sidebar-wrapper">
            <ul className="nav">
              {this.state.width <= 991 ? <HeaderLinks /> : null}
      
              {studentdashboardRoutes.map((prop, key) => {
                if (!prop.redirect)
                  return (
                    <li
                      className={
                        prop.upgrade
                          ? "active active-pro"
                          : this.activeRoute(prop.path)
                      }
                      key={key}
                    >
                      <NavLink
                        to={prop.path}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                  );
                return null;
              })}
            </ul>
          </div>
        </div>
      );
    }

  }
}

export default Sidebar;
