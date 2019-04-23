import React from 'react'

import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import { Table, Col } from "react-bootstrap"
import {
   Select
} from 'antd';
import "antd/dist/antd.css";
import Card from "components/Card/Card.jsx";



const Option = Select.Option;


function handleChange1(value) {

  this.setState(
    {
      selectedbranch: value
    }
  )
}

function handleChange2(value) {
  this.setState(
    {
      selecteddepartment: value
    }
  )
}

function handleChange() {
  var branch = this.state.selectedbranch;
  var department = this.state.selecteddepartment;
 
  if (branch == "" || department == "") {
    return (
      <div>
        <h3>No students found!</h3>
      </div>
    );
  }
  else {
    fetch("http://localhost:8023/findAll-role")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.data);
         this.setState(
           {
           students:result.data
           }
         )
        },
        (error) => {
          console.log("In Error");
        }
      )

      if(this.state.students.length>0)
      {
    return (
      <div>
        <Col md={12}>
          <Card
            title='Available Students'
            ctTableFullWidth
            ctTableResponsive
            content={
              <Table striped hover responsive='sm'>
                <thead>
                  <tr>
            
                  </tr>
                </thead>
                <tbody>
                  {this.state.students.map((item) => {
                    return(
                    <tr>
                      <td align='center'>
                      {item.Type.toUpperCase()}
                      </td>
                      <td align='center'>
                        <h5>EDIT</h5>
                      </td>
                    </tr>
                    )
                  })}
                </tbody>
              </Table>
            }
          />
        </Col>
      </div>
    );
          }
          else
          {
            return (
              <div>
                <h3>No students found!</h3>
              </div>
            );
          }
  }
}

class ViewStudents extends React.Component {


  state = {
    branch: [],
    department: [],
    selectedbranch: "",
    selecteddepartment: "",
    students:[],
    

  }

  componentDidMount() {
    fetch("http://localhost:8023/findAll-branch")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            branch: result.data
          });
        },
        (error) => {
          console.log("In Error");
          this.setState({

            error
          });
        }
      )

    fetch("http://localhost:8023/findAll-department")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            department: result.data
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
    return (
      <div align="left">
        <Sidebar {...this.props} />
        <Sidebar {...this.props} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header {...this.props} />

          <Select defaultValue="Branch" style={{ width: 200 }} onChange={handleChange1.bind(this)} >
            {this.state.branch.map((e, key) => {
              return <option key={key} value={e.Type}>{e.Type.toUpperCase()}</option>;
            })}
          </Select>

          <Select defaultValue="Department" style={{ width: 200 }} onChange={handleChange2.bind(this)} >
            {this.state.department.map((e, key) => {
              return <option key={key} value={e.Type}>{e.Type.toUpperCase()}</option>;
            })}
          </Select>

          {handleChange.call(this)}
        </div>
      </div>
    )
  }
}

export default ViewStudents