const setUser = (user) => {
  return {
    type: 'NEW_USER_SUBMITTED',
    user: user
  }
}

export default setUser;