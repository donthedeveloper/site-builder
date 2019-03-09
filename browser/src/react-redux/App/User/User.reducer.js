const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...action.user };
    case 'RESET_USER':
      return initialState;
    default:
      return state;
  }
};
