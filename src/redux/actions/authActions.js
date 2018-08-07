// @flow
import types from './types'

const signIn = (username: string, password: string, rememberMe: boolean, reject:Function) => ({
  type: types.AUTH.SIGN_IN,
  payload: {
    username,
    password,
    rememberMe,
    reject
  }
})

const signOut = () => ({type: types.AUTH.SIGN_OUT, payload: {}})

const AuthActions = {
  signIn,
  signOut
}

export default AuthActions