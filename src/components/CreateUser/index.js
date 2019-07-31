import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers, createUser } from '../../redux/action-creators';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      sex: '',
      age: '',
      password: '',
      passwordRepeat: '',
      passwordsSame: true
    };
  }
  getUsers = () => {
    this.props.dispatch(getUsers());
  }
  createUser = (user) => {
    this.props.dispatch(createUser(user));
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password === this.state.passwordRepeat) {
      const user = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        sex: this.state.sex,
        age: this.state.age,
        password: this.state.password
      };
      console.log(user);
      this.props.createUser(user);
      this.setState({
        firstname: '',
        lastname: '',
        sex: '',
        age: '',
        passwordsSame: true
      });
      this.props.redirectToUserlist();
    } else {
      this.setState({
        passwordsSame: false
      });
    }
  }
  handleFirstnameChange = e => {
    this.setState({firstname: e.target.value});
  }
  handleLastnameChange = e => {
    this.setState({lastname: e.target.value});
  }
  handleSexChange = e => {
    this.setState({sex: e.target.value});
  }
  handleAgeChange = e => {
    this.setState({age: parseInt(e.target.value)});
  }
  handlePasswordChange = e => {
    this.setState({password: e.target.value});
  }
  handleRepeatChange = e => {
    this.setState({passwordRepeat: e.target.value});
  }
 
  render() {
    const passwordStyle = {color: 'red'};
    const { redirect } = this.props;
    if (redirect) {
      return <Redirect to = {{ pathname: '/' }}/>
    } else {
      return (
        <div>
          <h2>Create New User</h2>
          <form onSubmit = {this.handleSubmit}>
            First Name: 
            <input type = 'text' id = 'firstname' value = {this.state.firstname} onChange = {this.handleFirstnameChange} required = {true} />
            Last Name: 
            <input type = 'text' id = 'lastname' value = {this.state.lastname} onChange = {this.handleLastnameChange} required = {true} />
            Sex: 
            <input type = 'text' id = 'sex' value = {this.state.sex} onChange = {this.handleSexChange} required = {true}/>
            Age: 
            <input type = 'number' id = 'age' value = {this.state.age} onChange = {this.handleAgeChange} required = {true}/>
            Password: 
            <input type = 'password' id = 'password' value = {this.state.password} onChange = {this.handlePasswordChange} required = {true} />
            <div> 
               <label htmlFor='passwordRepeat' style={this.state.passwordsSame === true? null : passwordStyle}>
                Password Repeat: 
               </label> 
              <input type = 'passoword' id = 'passwordRepeat' value = {this.state.passwordRepeat} onChange = {this.handleRepeatChange} required = {true} />
            </div> 
            <button type = "submit">Save User</button> 
          </form>
          {this.state.passwordsSame===true? null : <p style={passwordStyle}>Password doesn't match</p>}
        </div>
      );
    } 
  }
}


const mapStateToProps = (state) => {
  return {
    users: state.getUsers.users
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => {
      dispatch(getUsers());
    },
    createUser: (user) => {
      dispatch(createUser(user));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateUser);
