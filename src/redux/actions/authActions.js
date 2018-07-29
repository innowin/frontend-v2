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

const signInIsLoading = (isLoading: boolean) => ({
  type: types.IS_LOADING.AUTH.SIGN_IN,
  payload: {isLoading}
})

const signOut = () => ({type: types.AUTH.SIGN_OUT, payload: {}})

const AuthActions = {
  signIn,
  signInIsLoading,
  signOut
}

export default AuthActions