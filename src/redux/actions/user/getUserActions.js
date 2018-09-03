// @flow
import types from "../types"

const getUserByUserId = (userId:number) => ({
  type:types.USER.GET_USER_BY_USER_ID,
  payload:{userId}
})

const getProfileByUserId = (userId:number) => ({
  type:types.USER.GET_PROFILE_BY_USER_ID,
  payload:{userId}
})

const getUsers = () => ({
  type:types.USER.GET_USERS,
  payload:{}
})

const GetUserActions = {
  getUserByUserId,
  getProfileByUserId,
  getUsers
}

export default GetUserActions