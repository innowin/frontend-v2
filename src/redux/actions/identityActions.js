// @flow
import types from "./types"

const getUserIdentity = (userId: number) => ({
  type: types.USER.GET_USER_IDENTITY,
  payload: {userId}
})

const getOrgIdentity = (organizationId: number) => ({
  type: types.ORG.GET_ORG_IDENTITY,
  payload: {organizationId}
})


const GetIdentityActions = {
  getUserIdentity,
  getOrgIdentity
}

export default GetIdentityActions