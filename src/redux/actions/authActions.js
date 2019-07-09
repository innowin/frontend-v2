// @flow
import types from './types'

const signIn = (username: string, password: string, rememberMe: boolean, reject: Function, resolve: Function, Token) => ({
  type: types.AUTH.SIGN_IN,
  payload: {
    username,
    password,
    rememberMe,
    reject,
    resolve,
    Token,
  },
})

const signOut = () => ({type: types.AUTH.SIGN_OUT, payload: {}})

const verifyToken = (token: string) => ({
  type: types.AUTH.VERIFY_TOKEN,
  payload: {
    token,
  },
})

const setBeeDone = (isDone) => ({
  type: types.AUTH.SET_BEE_DONE,
  payload: {isDone},
})

const AuthActions = {
  signIn,
  signOut,
  verifyToken,
  setBeeDone,
}

export default AuthActions