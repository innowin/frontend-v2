// @flow
import types from './types'

const signIn = (username: string, password: string, remember: boolean) => ({
  type: types.AUTH.SIGN_IN,
  payload: {
    username,
    password,
    remember
  }
})

const signOut = () => ({type: types.AUTH.SIGN_OUT, payload: {}})

const AuthActions = {
  signIn,
  signOut
}

export default AuthActions