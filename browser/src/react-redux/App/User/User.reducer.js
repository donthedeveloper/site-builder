const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_USER_SUBMITTED':
      return { ...action.user }
    default:
      return state
  }
}
