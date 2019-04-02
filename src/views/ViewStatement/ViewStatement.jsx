import React from 'react'
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";


class ViewStatement extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
       <div align="left">
        <Sidebar {...this.props} />
        <Sidebar {...this.props} /> 
        <div align='center'id="main-panel" className="main-panel" ref="mainPanel">
          <Header {...this.props} />
        <h2> No problem statements assigned</h2>
        </div>
        </div>


    )
  }



}

export default ViewStatement
