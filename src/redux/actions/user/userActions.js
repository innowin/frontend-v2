// @flow
import types from "../types"

const checkUsername = (username:string, resolve:Function, reject:Function) => ({
  type:types.USER.USERNAME_CHECK,
  payload:{username, resolve, reject}
})

const createUserPerson = (formValues:{}, resolve:Function, reject:Function) => ({
  type:types.USER.CREATE_USER_PERSON,
  payload:{formValues, resolve, reject}
})

const createUserOrgan = (formValues:{}, resolve:Function, reject:Function) => ({
  type:types.USER.CREATE_USER_ORGAN,
  payload:{formValues, resolve, reject}
})

const UserActions = {
  checkUsername,
  createUserPerson,
  createUserOrgan
}

export default UserActions