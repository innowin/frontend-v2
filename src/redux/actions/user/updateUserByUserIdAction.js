// @flow
import types from "../types"

const updateUser = (formValues:{}, userId: number) => ({
  type:types.USER.UPDATE_USER_BY_USER_ID,
  payload:{formValues, userId}
})

export default {
  updateUser
}