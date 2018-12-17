const setUser = (user) => {
  return {
    type: 'NEW_USER_SUBMITTED',
    payload: user
  }
}

export default setUser;