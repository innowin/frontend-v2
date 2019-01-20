// @flow
import types from "../types"

const checkUsername = (username: string, resolve: Function, reject: Function) => ({
  type: types.USER.USERNAME_CHECK,
  payload: {username, resolve, reject}
})

const CheckUsernameAction = {
  checkUsername
}

export default CheckUsernameAction