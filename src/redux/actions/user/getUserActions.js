// @flow
import types from '../types'

const getUserByUserId = (userId: number) => ({
  type: types.USER.GET_USER_BY_USER_ID,
  payload: {userId},
})

const getUsers = () => ({
  type: types.USER.GET_USERS,
  payload: {},
})

const getAllUsers = (limit: number, offset: number, search: ?string, justOrgan: ?boolean) => ({
  type: types.USER.GET_ALL_USERS,
  payload: {limit, offset, search, justOrgan},
})

const resetSearchUser = () => ({
  type: types.USER.RESET_SEARCH_USER,
  payload: {},
})

const GetUserActions = {
  getAllUsers,
  getUserByUserId,
  getUsers,
  resetSearchUser,
}

export default GetUserActions