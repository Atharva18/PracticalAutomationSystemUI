import React, { Component } from "react";
import { Grid, Row, Col, Table ,Button} from "react-bootstrap"
import { HashRouter, Route, Switch } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import admindashboardRoutes from "routes/admindashboard.jsx";
import ChartistGraph from "react-chartist";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
}
  from "variables/Variables.jsx";

class Dashboard extends Component {
  /* createLegend(json) {
     var legend = [];
     for (var i = 0; i < json["names"].length; i++) {
       var type = "fa fa-circle text-" + json["types"][i];
       legend.push(<i className={type} key={i} />);
       legend.push(" ");
       legend.push(json["names"][i]);
     }
   return legend;
   }*/
  render() {
    return (




      /* <div className="content">
         <Grid fluid>
           <Row>
             <Col lg={3} sm={6}>
               <StatsCard
                 bigIcon={<i className="pe-7s-server text-warning" />}
                 statsText="Capacity"
                 statsValue="105GB"
                 statsIcon={<i className="fa fa-refresh" />}
                 statsIconText="Updated now"
               />
             </Col>
             <Col lg={3} sm={6}>
               <StatsCard
                 bigIcon={<i className="pe-7s-wallet text-success" />}
                 statsText="Revenue"
                 statsValue="$1,345"
                 statsIcon={<i className="fa fa-calendar-o" />}
                 statsIconText="Last day"
               />
             </Col>
             <Col lg={3} sm={6}>
               <StatsCard
                 bigIcon={<i className="pe-7s-graph1 text-danger" />}
                 statsText="Errors"
                 statsValue="23"
                 statsIcon={<i className="fa fa-clock-o" />}
                 statsIconText="In the last hour"
              />
             </Col>
             <Col lg={3} sm={6}>
               <StatsCard
                 bigIcon={<i className="fa fa-twitter text-info" />}
                 statsText="Followers"
                 statsValue="+45"
                 statsIcon={<i className="fa fa-refresh" />}
                 statsIconText="Updated now"
               />
             </Col>
           </Row>
           <Row>
             <Col md={8}>
               <Card
                 statsIcon="fa fa-history"
                 id="chartHours"
                 title="Users Behavior"
                 category="24 Hours performance"
                 stats="Updated 3 minutes ago"
                 content={
                   <div className="ct-chart">
                     <ChartistGraph
                       data={dataSales}
                       type="Line"
                       options={optionsSales}
                       responsiveOptions={responsiveSales}
                     />
                   </div>
                 }
                 legend={
                   <div className="legend">{this.createLegend(legendSales)}</div>
                 }
               />
             </Col>
             <Col md={4}>
               <Card
                 statsIcon="fa fa-clock-o"
                 title="Email Statistics"
                 category="Last Campaign Performance"
                 stats="Campaign sent 2 days ago"
                 content={
                   <div
                     id="chartPreferences"
                     className="ct-chart ct-perfect-fourth"
                   >
                     <ChartistGraph data={dataPie} type="Pie" />
                   </div>
                 }
                 legend={
                   <div className="legend">{this.createLegend(legendPie)}</div>
                 }
               />
             </Col>
           </Row>
 
           <Row>
             <Col md={6}>
               <Card
                 id="chartActivity"
                 title="2014 Sales"
                 category="All products including Taxes"
                 stats="Data information certified"
                 statsIcon="fa fa-check"
                 content={
                   <div className="ct-chart">
                     <ChartistGraph
                       data={dataBar}
                       type="Bar"
                       options={optionsBar}
                       responsiveOptions={responsiveBar}
                     />
                   </div>
                 }
                 legend={
                   <div className="legend">{this.createLegend(legendBar)}</div>
                 }
               />
             </Col>
 
             <Col md={6}>
               <Card
                 title="Tasks"
                 category="Backend development"
                 stats="Updated 3 minutes ago"
                 statsIcon="fa fa-history"
                 content={
                   <div className="table-full-width">
                     <table className="table">
                       <Tasks />
                     </table>
                   </div>
                 }
               />
             </Col>
           </Row>
         </Grid>
       </div>*/
      <div >
        <div align='left' id="main-panel" className="main-panel" ref="mainPanel">
          <Sidebar {...this.props} />
          <Col md={12}>
            <Card
              title="Online Practical Automation System"
              category="Instructions"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover responsive='sm'>
                  <thead>
                    <tr>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    <p> There are three roles by default: ADMIN,STUDENT & FACULTY</p>
                   <tr> <p> Add roles can be used to create new roles</p></tr>
                    <tr><p> Single as well as multiple users can be enrolled</p></tr>
                    <tr><p>For creating exam, use create exam option.</p></tr> <p>For further queries contact janamejaykeskar@gmail.com</p>
                    </tr>
                    
                    
                
                  </tbody>
                </Table>
              }
            />
          </Col>




        </div>

      </div>
    );
  }
}

export default Dashboard;
