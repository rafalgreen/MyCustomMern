import React, {Component} from 'react';
import axios from 'axios';

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            members: []
        }
        this.logChange = this.logChange.bind(this);
    }

    componentDidMount() {
        let self = this;
        axios.get("/users")
            .then((response) => {
                self.setState({members: [...response.data]});
            })
            .catch((error) => {
                throw error;
            });
    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="Users container">
                <h1>Users</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Login</th>
                        <th>Profile</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.members.map(member =>
                        <tr key={member._id}>
                            <td>{member.login} </td>
                            <td>{member.profile}</td>
                            <td>
                                <button className="btn btn-primary">Edit</button>
                                <button className="btn btn-danger" onClick={() => this.removeUser(member._id)}>Delete
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }

    removeUser(id) {
        axios.delete("/users/id/" + id)
            .then((response) => {
                this.setState({
                    members: this.state.members.filter(m => m._id !== id)
                });
            })
            .catch((error) => {
                throw error;
            });
    }
}
