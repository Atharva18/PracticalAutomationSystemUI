import React from 'react'

import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import { Grid, Row, Col, Table, Button } from "react-bootstrap"
import Card from "components/Card/Card.jsx";

function addCheckbox() {

  console.log(this.state.items);
  const checkbox = [];
  this.state.items.map((item, key) => {

    const fname = item.fname;
    const lname = item.lname;
    const email = item.email;
    checkbox.push({
      checked: true,
      fname,
      lname,
      email
    });
  }
  );

  this.setState(
    {
      checkboxes: checkbox
    }
  )
  // console.log(this.state.checkboxes);

}

function toggleCheckbox(index) {
  const { checkboxes } = this.state;
 // checkboxes[index].checked = !checkboxes[index].checked;
 checkboxes.splice(index,1);
  this.setState({
    checkboxes
  });
}

function enrollstudents()
{
  


  


}

function renderCheckboxes() {
  const { checkboxes } = this.state;

  return (

    <div>
      <Col md={12}>
        <Card
          title="ADD STUDENTS"
          category="AVAILABLE STUDENTS"
          ctTableFullWidth
          ctTableResponsive
          content={
            <Table align='center' striped hover responsive>

              <thead class="thead-dark">
                <tr>
                  <th scope="col">Select</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Branch</th>
                  <th scope="col">Department</th>
                </tr>
              </thead>

              <tbody>
                {checkboxes.map((checkbox, index) =>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkbox.checked}
                        onChange={toggleCheckbox.bind(this, index)} />
                    </td>
                    <td>{checkbox.fname}</td>
                    <td>{checkbox.lname}</td>
                    <td>{checkbox.email}</td>
                    <td>Computer</td>
                    <td>SE</td>
                  </tr>
                )}
              </tbody>
            </Table>
          } 
        />
      </Col>

    </div>
  );

}

function updateFilter(filter) {
  this.setState({
    filter
  });
}

class Enrollment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxes: [],
      filter: 'ALL',
      items: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8023/findAll")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result
          });

          addCheckbox.call(this);
        },
        (error) => {
          console.log("In Error");
          this.setState({
            isLoaded: true,
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

          {renderCheckboxes.call(this)}
          <div align='center'>
            <br></br>
            <button onClick={enrollstudents.bind(this)}>
              Add students
                 </button>
          </div>
        </div>
      </div>
    );
  }
}



export default Enrollment