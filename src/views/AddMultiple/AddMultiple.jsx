import React from 'react';
import Sidebar from "components/Sidebar/Sidebar";

class AddMultiple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            file: null,
            isLoaded: false,
            items: []
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault()
        this.fileUpload(this.state.file).then((response) => {
            console.log("File uploaded");
        })
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    fileUpload(file) {
        const formData = new FormData();
        formData.append('file', file);
        const url = 'http://localhost:8026/csv-preview';
        const config = {
            method: 'POST',
            body: formData,
            mode: 'cors'
        };
        return fetch(url, config, formData)
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result)
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
        const { error, isLoaded, items } = this.state;
        return (
            <div align="center">
             <Sidebar {...this.props} />
                <h2>Add multiple students:</h2>
                <div>
                    <form onSubmit={this.onFormSubmit}>
                        <label>Select a file:</label>
                        <input type="file" onChange={this.onChange} />
                        <button type="submit">Upload</button>
                    </form>
                </div>
                <div>
                    <table>
                        <tr>
                        </tr>
                        {
                            items.map(item => (
                                <tr>
                                    <td>
                                        {item.fname}
                                    </td>
                                    <td>
                                        {item.lname}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>
                                        <h5>Edit</h5>
                                    </td>
                                </tr>
                            ))}

                    </table>
                </div>
            </div>
        );
    }
}

export default AddMultiple;