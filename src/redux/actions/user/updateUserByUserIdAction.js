// @flow
import types from '../types'

const updateUser = (formValues: {}, identity: number) => ({
  type: types.USER.UPDATE_USER_BY_USER_ID,
  payload: {formValues, identity},
})

export default {
  updateUser,
}