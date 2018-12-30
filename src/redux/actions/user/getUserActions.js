// @flow
import types from '../types'

const getUserByUserId = (userId: number) => ({
  type: types.USER.GET_USER_BY_USER_ID,
  payload: {userId}
})

const getProfileByUserId = (userId: number) => ({
  type: types.USER.GET_PROFILE_BY_USER_ID,
  payload: {userId}
})

const getUsers = () => ({
  type: types.USER.GET_USERS,
  payload: {}
})

const getAllUsers = (limit: number, offset: number, search: ?string) => ({
  type: types.USER.GET_ALL_USERS,
  payload: {limit, offset, search}
})

const resetSearchUser = () => ({
  type: types.USER.RESET_SEARCH_USER,
  payload:{}
})

const GetUserActions = {
  getAllUsers,
  getProfileByUserId,
  getUserByUserId,
  getUsers,
  resetSearchUser,
}

export default GetUserActions