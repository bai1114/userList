const initState = {
  users: {},
  err: null,
  isLoading: false
};

const editUser = (state = initState, action) => {
  switch(action.type) {
    case 'EDIT_USER_START':
      return {
        ...state,
        isLoading: true
      };
    case 'EDIT_USER_ERROR':
      return {
        ...state,
        isLoading: false,
        err: action.error
      };
    case 'EDIT_USER_SUCCESS':
      return {
        ...state,
        isLoading:false,
        err: null,
        users: action.data
      };
    default:
      return state;
  }
}

export default editUser;