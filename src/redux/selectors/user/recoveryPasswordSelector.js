import {createSelector} from 'reselect'

const recoveryPassword = (state) => {
  return state.users.recoveryPassword
}

export const recoveryPasswordSelector = createSelector(
    recoveryPassword,
    recoveryPassword => recoveryPassword
)