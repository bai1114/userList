import axios from 'axios';
// Create User
const createUserStart = () => {
  return {
    type: 'CREATE_USER_START'
  };  
};
const createUserFail = (error) => {
  return {
    type:'CREATE_USER_FAIL',
    error
  };
};

const createUserSuccess = (user) => {
  return {
    type:'CREATE_USER_SUCCESS',
    user
  }
};

export const createUser = (user) => {
  return (dispatch) => {
    dispatch(createUserStart());
    axios({
      method: 'POST',
      url: 'http://localhost:8080/api/users',
      data: user
    })
      .then(response => {
        console.log(response.data);
        dispatch(createUserSuccess(response.data.newUser));
      })
      .catch(error => {
        dispatch(createUserFail(error));
      });
  };
};

// Edit User
const editUserStart = () => {
  return {
    type: 'EDIT_USER_START'
  };
};

const editUserFail = (error) => {
  return {
    type: 'EDIT_USER_ERROR',
    error
  };
};

const editUserSuccess = (id) => {
  return {
    type: 'EDIT_USER_SUCCESS',
    id
  };
}

export const editUser = (id, editUser) => {
  return (dispatch) => {
    dispatch(editUserStart());
    axios
      .put(`http://localhost:8080/api/users/${id}`, editUser)
      .then(response => {
        dispatch(editUserSuccess(id));
        dispatch(getUsers());
      })
      .catch(error => {
        dispatch(editUserFail(error));
      });
  };
};

// Delete User
const deleteUserStart = () => {
  return {
    type: 'DELETE_USER_START'
  };
};

const deleteUserFail = (error) => {
  return {
    type: 'DELETE_USER_ERROR',
    error
  };
};

const deleteUserSuccess = (id) => {
  return {
    type: 'DELETE_USER_SUCCESS',
    id
  };
}

export const deleteUser = (id, deleteUser) => {
  return (dispatch) => {
    dispatch(deleteUserStart());
    axios
      .delete(`http://localhost:8080/api/users/${id}`, deleteUser)
      .then(response => {
        dispatch(deleteUserSuccess(id));
        dispatch(getUsers());
        console.log('delete user success');
      })
      .catch(error => {
        dispatch(deleteUserFail(error));
      });
  };
};

// Get Userlist
const getUserStart = () => {
  return {
    type: 'GET_USER_START'
  };
};

const getUserFail = (error) => {
  return {
    type: 'GET_USER_ERROR',
    error
  };
};

const getUserSuccess = (response) => {
  return {
    type: 'GET_USER_SUCCESS',
    data: response
  };
}

export const getUsers = () => {
  return (dispatch) => {
    dispatch(getUserStart());
    axios
      .get('http://localhost:8080/api/users', getUsers)
      .then(response => {
        dispatch(getUserSuccess(response.data));
      })
      .catch(error => {
        dispatch(getUserFail(error));
      });
  };
};

// Redirect
export const redirect = () => {
  return {
    type: 'REDIRECT'
  };
};

export const cancelRedirect = () => {
  return {
    type: 'CANCEL_REDIRECT'
  };
};




