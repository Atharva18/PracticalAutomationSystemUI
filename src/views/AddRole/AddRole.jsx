import React from 'react';
//import { Card } from "components/Card/Card.jsx";

class AddRole extends React.Component{
    constructor(props){
        super(props);
        this.onSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            error: null,
            isLoaded: false,
            items: [],
            text:''

        }
    };

    handleChange(e) {
        this.setState({ text: e.target.value });
      }
    handleSubmit(e)
    {
        e.preventDefault();
        var self = this;
        fetch('http://localhost:8023/role-create',{
            method: 'POST',
            body:JSON.stringify({
                Type: self.refs.task.value
            }),
            headers: {"Content-Type": "application/json"}
        }).then(response=>response.json())
        .then(response => {
           console.log(response.body);
            if(response.result==='Success')
            {

                var newStateArray = this.state.items.slice();
                var obj=
                {
                    Type:response.data
                }
                newStateArray.push(obj);
                this.setState({items:newStateArray,text:''})
            }
         });
    }

    componentDidMount() {
        fetch("http://localhost:8023/findAll-role")
        .then(res => res.json())  
        .then(
            (result) => {
                console.log(result);
            this.setState({
                isLoaded: true,
                items: result.data
            });
            },
            (error) => {
                console.log("In Error");
            this.setState ({
                isLoaded: true,
                error
            });
            }
        )
    }
    render(){
        const { error, isLoaded, items } = this.state;
        return(
        <div align="center">
        <table>
            <tr>
                <th>
                    <h3><b> Available Roles</b> </h3>
                </th>
            </tr>
           
            {items.map(item =>(
            <tr>
                <td>
                 {item.Type}
                </td>
                 <td>
                    <h5>Edit</h5>
                 </td>
            </tr>
            ))}
       
        </table>
        <br></br>
        <form onSubmit={this.onSubmit}>
            <input type="text" onChange={this.handleChange} value={this.state.text} ref="task"></input>
            <br></br>
            <br></br>
            <input type="submit" name="submit" value="Submit"></input>
        </form>   
        </div>
        )
    }
}
export default AddRole;


