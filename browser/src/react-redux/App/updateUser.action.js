export const updateUser = user => ({
  type: 'UPDATE_USER',
  user
})

export const loginSuccess = user => ({
  type: 'LOGIN_SUCCESS',
  user
})

export const loginFailure = user => ({
  type: 'LOGIN_ERROR',
  user
})