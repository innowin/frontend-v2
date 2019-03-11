import {createSelector} from 'reselect'

const recoveryPassword = (state) => {
  return state.identities.recoveryPassword
}

export const recoveryPasswordSelector = createSelector(
    recoveryPassword,
    recoveryPassword => recoveryPassword
)