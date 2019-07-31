const initState = {
  isLoading: false,
  users:[],
  err: null
};

const getUsers = (state = initState, action) => {
  switch(action.type) {
    case 'GET_USER_START':
      return {
        ...state,
        isLoading: true,
        err: null
      };
    case 'GET_USER_FAIL':
      return {
        ...state,
        isLoading: false,
        err: action.error
      };
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        err: null,
        users: action.data
      };
    
    case 'DELETE_USER_START':
      return {
        ...state,
        isLoading: true
      };
    case 'DELETE_USER_ERROR':
      return {
        ...state,
        isLoading: false,
        err: action.error
      };
    case 'DELETE_USER_SUCCESS':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.id),
        isLoading:false,
        err: null,
      };
    
    case 'CREATE_USER_START':
      return {
        ...state,
        isLoading: true,
        err: null
      };
    case 'CREATE_USER_FAIL':
        console.log("Create User Error : " + action.err);
      return {
        ...state,
        isLoading: false,
        err: action.error
      };
    case 'CREATE_USER_SUCCESS':
      const newUsers = state.users;
      newUsers.push(action.user);
      return {
        ...state,
        isLoading: false,
        err: null,
        users: newUsers
      };
    default:
      return state;
  }
}

export default getUsers;