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

const getAllUsers = (limit, offset) => ({
  type:types.USER.GET_ALL_USERS,
  payload: {limit, offset}
})

const GetUserActions = {
  getUserByUserId,
  getProfileByUserId,
  getUsers,
  getAllUsers
}

export default GetUserActions