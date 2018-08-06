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

const getUserByUserId = (userId:number) => ({
  type:types.USER.GET_USER_BY_USER_ID,
  payload:{userId}
})

const getProfileByUserId = (userId:number) => ({
  type:types.USER.GET_PROFILE_BY_USER_ID,
  payload:{userId}
})

const UserActions = {
  checkUsername,
  createUserPerson,
  createUserOrgan,
  getUserByUserId,
  getProfileByUserId
}

export default UserActions