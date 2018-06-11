import React, {Component} from 'react'
import axios from 'axios'
import Row from './Components/Row'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            members: []
        }
        //this.removeUser = this.removeUser.bind(this);
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
            <div className="container">
                <h1>Users</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Lp</th>
                        <th>Login</th>
                        <th>Profile</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.members.map(member => <Row removeUser={this.removeUser} user={member}/>)
                    }
                    </tbody>
                </table>
                <button className="btn btn-success" onClick={() => this.addRandomUser()}>Add Random</button>

            </div>
        );
    }

    removeUser = (id) => {
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

    addRandomUser(){
        axios.put("/users/create-random")
            .then((response) => {
                this.setState({
                    members: [...this.state.members, ...response.data]
                });
            })
            .catch((error) => {
                throw error;
            });
    }
}
