const redirect = (state = false, action) => {
  switch(action.type) {
    case 'REDIRECT':
      return true;
    case 'CANCEL_REDIRECT':
      return false;
    default:
      return state;
  }
};

export default redirect;