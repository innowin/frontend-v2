// @flow
import types from "../types"

const updateProfile = (formValues:{}, profileId: number, userId: number) => ({
  type:types.USER.UPDATE_PROFILE_BY_PROFILE_ID,
  payload:{formValues, profileId, userId}
})

export default {
  updateProfile
}