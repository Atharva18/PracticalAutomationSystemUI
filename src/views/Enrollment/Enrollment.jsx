import React from 'react'

import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import { Grid, Row, Col, Table, Button } from "react-bootstrap"

function addCheckbox() {

  console.log(this.state.items);
  const checkbox=[];
 this.state.items.map((item, key) =>
  {

  const fname= item.fname;
  const lname= item.lname;
  const email= item.email;


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
      checkboxes:checkbox
    }
  )
// console.log(this.state.checkboxes);

}

function toggleCheckbox(index) {
  const {checkboxes} = this.state;

  checkboxes[index].checked = !checkboxes[index].checked;

  this.setState({
      checkboxes
  });
}

function renderCheckboxes() {
  const {checkboxes, filter} = this.state;

  return checkboxes
      .filter(checkbox =>
          filter === 'ALL' ||
          filter === 'CHECKED' && checkbox.checked ||
          filter === 'UNCHECKED' && !checkbox.checked
      )
      .map((checkbox, index) =>
          <div>
             <Table align='center'striped hover responsive>
             <tbody>
              <tr>
                <td>
                  <input
                      type="checkbox"
                      checked={checkbox.checked}
                      onChange={toggleCheckbox.bind(this, index)}/>
                </td>
                  <td>{checkbox.fname}</td>
                  <td>{checkbox.lname}</td> 
                  <td>{checkbox.email}</td>
              </tr>
              </tbody>
              </Table>
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
          items:[]
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
                <Header {...this.props}/>
               <h3 align='center'><b>Enroll Students</b></h3>
              {renderCheckboxes.call(this)}
              <div align='center'>
              <br></br>
              <button onClick={addCheckbox.bind(this)}>Search</button>
             
                  <button onClick={updateFilter.bind(this, 'ALL')}>
                  All
                  </button>

                  <button onClick={updateFilter.bind(this, 'CHECKED')}>
                  Checked
                 </button>
                  </div>
              </div>
          </div>
      );
  }
}



export default Enrollment