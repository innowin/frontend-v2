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

const verifyToken = (token: string) => ({
  type: types.AUTH.VERIFY_TOKEN,
  payload: {
    token
  }
})

const AuthActions = {
  signIn,
  signOut,
  verifyToken
}

export default AuthActions