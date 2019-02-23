import React from 'react'
import Sidebar from "components/Sidebar/Sidebar";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";


class AddSingle extends React.Component {


  render() {
    return (

      <div>

        <div align="center">
          <Sidebar {...this.props} />
          <div id="main-panel" className="main-panel" ref="mainPanel">
          <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "College (disabled)",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Pimpri Chinchwad College of Engineering",
                          ref:"task1",
                          disabled: true
                        },
                        {
                          label: "User Id",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "User-ID",
                          
                        }
                       
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      proprieties={[
                        
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email"
                        },
                        {
                          label: "Password",
                          type: "password",
                          bsClass: "form-control",
                          placeholder: "Password",
                          
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4","col-md-4"]}
                      proprieties={[
                        {
                          label: "First name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          
                        },
                        {
                          label: "Last name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                         
                        },
                        {
                          label: "Role Type",
                          type: "spinner",
                          bsClass: "form-control",
                          placeholder: "Role-Type",
                         
                        }
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
                      Add Profile
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
              </Col>
              </Row>
              </Grid>
              </div>
          </div>
        </div>
      </div>

    );


  }


}


export default AddSingle