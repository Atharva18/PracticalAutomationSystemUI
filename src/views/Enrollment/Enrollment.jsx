import React from 'react'

import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import { Grid, Row, Col, Table, Button } from "react-bootstrap"
import Card from "components/Card/Card.jsx";
import {message } from 'antd';

function addCheckbox() 
{
 // console.log(this.state.items);
  const checkbox = [];
  if(this.state.items.length>0)
  this.state.items.map((item, key) => {

    const fname = item.fname;
    const lname = item.lname;
    const email = item.email;
    const id= item._id;
    const batchname=""
   // console.log(id);
    checkbox.push({
      checked: false,
      fname,
      lname,
      email,
      batchname,
      id
    });
  }
  );

  this.setState(
    {
      checkboxes: checkbox
    }
  )
  }
  // console.log(this.state.checkboxes);



function toggleCheckbox(index) {
  const { checkboxes } = this.state;
  var count= this.state.size;
  if(checkboxes[index].checked==true)
  {
    checkboxes[index].checked=false;
    count--;

  }
  else
  {
    checkboxes[index].checked=true;
    count++;
  }
 //checkboxes.splice(index,1);
  this.setState({
    checkboxes:checkboxes,
    size:count
  });
}

function addbatch(e)
{
  this.setState({
    size:this.refs.size.value
  })
  var size= this.refs.size.value;
  var checkbox = this.state.checkboxes;
  
  checkbox.map((item, index) => 
  {
    if(index<size)
    {
      checkbox[index].checked=true;
    }
    else
    {
      checkbox[index].checked= false;
    }
  }
  )

  this.setState({
    checkboxes:checkbox
  });
}

function enrollstudents(e)
{

  var branch = localStorage.getItem('branch');
  var year = localStorage.getItem('year');
  var subject = localStorage.getItem('subject')
  //localStorage.clear();

  console.log(subject);
  var name=this.state.name

  if(this.state.size == 0 || this.state.name=="")
  {
    alert('Please enter batch size and name');
  }
  else
  {
    var checkedboxes=[];
    var uncheckedboxes=[];
    var checkboxes=this.state.checkboxes;
    checkboxes.map((item, index) =>
    {

      if(checkboxes[index].checked==true)
      {
        checkboxes[index].batchname = name
        checkedboxes.push(checkboxes[index])
        
      }
      else
      {
        uncheckedboxes.push(checkboxes[index]);
      }
    })

    this.setState(
      {
       checkboxes:uncheckedboxes,
       size:0,
       name:""
      }
    )

    console.log(checkedboxes);
    

  //alert(branch);
  e.preventDefault();
        var self = this;
        fetch('http://localhost:8023/user-enrol',
         {
            method: 'POST',
            body: JSON.stringify({
                user:checkedboxes,
                branch:branch,
                year:year,
                subject:subject,
                name:this.state.name,
                size:this.state.size
            }),
            headers: { "Content-Type": "application/json" }
             })
             .then(response => response.json())
             .then(response =>
               {
                console.log(response.body);
                if (response.result === 'Success') {

                    message.success('Users added successfully')
                }
                else
                {
                  alert(response.result);
                }
            });
          }

}

function renderCheckboxes() {
  const { checkboxes } = this.state;
  var branch = localStorage.getItem('branch');
  var year = localStorage.getItem('year');
  var subject = localStorage.getItem('subject')
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
                    <td>{branch}</td>
                    <td>{year}</td>
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

function batchname()
{
  this.setState({
    name:this.refs.name.value
  })
}

class Enrollment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxes: [],
      items: [],
      size:0,
      name:""
    };
  }

  componentDidMount() {

  var branch = localStorage.getItem('branch');
  var year = localStorage.getItem('year');
  var subject = localStorage.getItem('subject');
  console.log(subject);
 // localStorage.clear();
 var checkedentries=[];
 var items=[];
 // console.log('in enroll'+ branch);

    fetch(`http://localhost:8023/find-users/${branch}/${year}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
            items=result
        
            fetch(`http://localhost:8023/find-examinees/${branch}/${year}/${subject}`)
            .then(res => res.json())
            .then(
                (response) => {
                    console.log(response);

                    if(response.length>0)
                    {
                   checkedentries= response[0].user;
                   console.log(checkedentries);
                   console.log(items);

                  var uniqueResultOne = items.filter(function(obj) 
                  {
                      return !checkedentries.some(function(obj2) {
                          return obj._id == obj2.id;
                      });
                  });

                  console.log(uniqueResultOne);

                  this.setState(
                    {
                      items:uniqueResultOne
                    }
                  )
                  addCheckbox.call(this);
                  }
                  else
                  {
                    this.setState(
                      {
                        items:items  
                      }
                    )
                    addCheckbox.call(this);
                    }
                },
                (error) => {
                    console.log("In Error");
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
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
       
        <div align='left' id="main-panel" className="main-panel" ref="mainPanel">
          <Header {...this.props} />

          {renderCheckboxes.call(this)}
          <div align='center'>
            <br></br>
            
              Enter Batch Size :
              <input type='number' min ='0' value= {this.state.size} onChange={addbatch.bind(this)}ref='size'/>
              Enter Batch Name :
              <input type='text' value= {this.state.name} onChange={batchname.bind(this)} ref='name'/>
              <br></br>
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
