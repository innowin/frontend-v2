import initialState from "./initialState"

const user = (state = initialState.user, action) => {
  switch (action.type) {
    //type of  USERNAME_CHECK is not need to set in states because its result and error is handle by result handler function
    default:
      return state
  }
}

export default user