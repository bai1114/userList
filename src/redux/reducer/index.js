import { combineReducers } from 'redux';
import editUser from './editUser';
import getUsers from './getUsers';
import redirect from './redirect';

const reducers = combineReducers({
  editUser,
  getUsers,
  redirect
});

export default reducers;