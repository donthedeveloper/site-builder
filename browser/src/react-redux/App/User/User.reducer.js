const initialState = {
  loginError: null,
  loggedIn: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_USER_SUBMITTED':
      return { ...action.user }
    case 'LOGIN_ERROR':
      return {
        ...state,
        loginError: 'Login failed',
        loggedIn: false
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loginError: null,
        loggedIn: true
      }
    default:
      return state
  }
}
