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

const getIdentityByUserId = (userId:number) => ({
  type:types.USER.GET_IDENTITY_BY_USER_ID,
  payload:{userId}
})

const GetUserActions = {
  getUserByUserId,
  getProfileByUserId,
  getIdentityByUserId
}

export default GetUserActions