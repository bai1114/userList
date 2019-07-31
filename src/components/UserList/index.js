import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, deleteUser, editUser } from '../../redux/action-creators';
//import { BrowserRouter, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

class UserList extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  
  deleteUser = id => {
    this.props.deleteUser(id);
  }
  
  editUser = id => {
    this.props.editUser(id);
  }

  render() {
    return (
      <div className = 'container'>
        <h2>Users</h2>
        <div className = 'searchBox'>
          <form>
            Search:
            <input type = 'text' name = 'search' />
          </form>
        </div>
        <table>
          <thead> 
            <tr>
              <th>Edit</th>
              <th>Delete</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Sex</th>
              <th>Age</th>
            </tr>    
          </thead>
          
          <tbody>
            {this.props.users.map(user => {
              return (
                <tr key = {user._id}>
                  <td><button type = 'button' onClick={() => this.props.editUser()}>Edit</button></td>
                  <td><button type = 'button' onClick={() => this.props.deleteUser(user._id)}>Delete</button></td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.sex}</td>
                  <td>{user.age}</td>
                </tr>
              );
            })} 
          </tbody> 
        </table>
        <Link to="/users" className="btn btn-primary" > 
          Create New User
        </Link>
      </div>
    );
  }
}



export default UserList;

