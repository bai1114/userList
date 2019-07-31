import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUsers, deleteUser, createUser, cancelRedirect, redirect } from '../../redux/action-creators';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserList from '../../components/UserList';
import CreateUser from '../../components/CreateUser';
// import EditUser from '../../components/EditUser';

class App extends Component { 
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact = {true} 
            path = '/' 
            render = {() => 
              <UserList 
                users = {this.props.users}
                getUsers = {this.props.getUsers}
                deleteUser = {this.props.deleteUser}
                isLoading = {this.props.isLoading}
                cancelRedirect={this.props.cancelRedirect}
              /> 
            } 
          />
          <Route 
            path = '/users' 
            render = {() => 
              <CreateUser 
                createUser = {this.props.createUser} 
                redirect = {this.props.redirect}
                redirectToUserlist = {this.props.redirectToUserlist}
                isLoading = {this.props.isLoading}
                
              />
            }
          />
           {/* <Route path = '/users' component = {CreateUser} /> 
           <Route path = '/users/:user_id' component = {EditUser} />  */}
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.getUsers.users,
    redirect: state.redirect,
    isLoading:state.getUsers.isLoading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => {
      dispatch(getUsers());
    },
    deleteUser: (_id) => {
      dispatch(deleteUser(_id));
    },
    createUser: (user) => {
      dispatch(createUser(user));
    },
    redirectToUserlist: () => {
      dispatch(redirect());
    },
    cancelRedirect: () => {
      dispatch(cancelRedirect());
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

