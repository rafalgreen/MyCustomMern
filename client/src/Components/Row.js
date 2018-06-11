import React, {Component} from 'react';

export default class Row extends Component{

    render() {
        return (
        <tr key={this.props.user._id}>
            <td>{this.props.user._id} </td>
            <td>{this.props.user.login} </td>
            <td>{this.props.user.profile}</td>
            <td>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger" onClick={() => this.props.removeUser(this.props.user._id)}>Delete</button>
            </td>
        </tr>
        );
    }
}
