import React from 'react'
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import { configConsumerProps } from 'antd/lib/config-provider';
import {
  Form, Input, Select, Button, Row, Col
} from 'antd';
import "antd/dist/antd.css";
import { Alert ,message,Card,Modal} from 'antd';



import { createHashHistory } from 'history'

var map = new Map()

export const history = createHashHistory()
const confirm = Modal.confirm;

function showConfirm() {
  confirm({
    title: 'Are you sure you want to attempt the exam?',
    okText:'Yes',

    //content: 'When clicked the OK button, this dialog will be closed after 1 second',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            history.push({
              pathname: '/ViewStatement',
            })
      }).catch(() => console.log('Error Occured! Please try again later'));
    },
    onCancel() {},
  });
}


class ViewExamSubjects extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      subjects: []
    }
  }

  handleSubmit(e) {

    var key = parseInt(e.target.id, 10);
    //  console.log(map.get(key));
    var subject = map.get(key);
    //console.log(element);

    // console.log(sessionStorage.getItem('subject'));


    fetch('http://localhost:8023/get-dates', {
      method: 'POST',
      body: JSON.stringify({
        course: subject
      }),
      headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
      .then(response => {
        console.log(response);

        if (response.result == 'Success') {

          console.log(response.data);
          var startdate = response.data.start_date + " " + "00:00:00";
          var enddate = response.data.end_date + " " + "00:00:00";
          var presenttimestamp = new Date().getTime() / 1000;
          var starttimestamp = Date.parse(startdate) / 1000;
          var endtimestamp = Date.parse(enddate) / 1000;
          console.log(presenttimestamp)
          console.log(starttimestamp)
          console.log(endtimestamp)

          if (presenttimestamp <= endtimestamp && presenttimestamp >= starttimestamp) {

            sessionStorage.setItem('examsubject', subject);
            showConfirm.call(this)
            /*
            sessionStorage.setItem('examsubject', subject);
            history.push({
              pathname: '/ViewStatement',
            })*/

          }
          else if (presenttimestamp >= endtimestamp) {
            message.info('Exam has already ended');
          }
          else {
            
            message.info('Exam is yet to start');
          }

        }
      });
  }

  componentDidMount() {

    var id = sessionStorage.getItem('id');
    console.log(id);

    fetch('http://localhost:8023/appeared-subjects', {
      method: 'POST',
      body: JSON.stringify({
        id: id
      }),
      headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.result === 'Success') {
          this.setState(
            {
              subjects: response.data
            }
          )
          console.log(this.state.subjects);
        }
        else if (response.result === 'Failure') {

        }
        else if (response.result === 'Student not enrolled') {

        }
      });
  }


  render() {
    return (
      <div align="left">
        <Sidebar {...this.props} />
        <Sidebar {...this.props} />
        <div align='center' id="main-panel" className="main-panel" ref="mainPanel">
          <Header {...this.props} />
      
          <h3>Available Exams</h3>
          <br></br>
          {this.state.subjects.map((item, index) => {
             
            map.set(index, item.subject)
            return (
             
              <table>
                <tbody align='left'>
                  <tr>
                    <td align='left'>{item.subject.toUpperCase()}</td>
                    <td align='left'>
                      <Button type="primary" onClick={this.handleSubmit} id={index}>Attempt Exam</Button>

                    </td>
                  </tr>
                </tbody>
              </table>
              
            );
            
          })}



        </div>
      </div>


    )
  }



}

export default ViewExamSubjects
