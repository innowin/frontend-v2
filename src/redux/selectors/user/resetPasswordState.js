import {createSelector} from 'reselect'

const resetPassword = (state) => {
  return state.users.resetPassword
}

export const resetPasswordSelector = createSelector(
  resetPassword,
  resetPassword => resetPassword
)