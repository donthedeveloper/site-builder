const setUser = (user) => {
  return {
    type: 'NEW_USER_SUBMITTED',
    user
  }
}

export default setUser;