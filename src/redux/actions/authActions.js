import types from './types'

const signIn = (username, password , remember) => ({
	type: types.AUTH.SIGN_IN,
	payload: {
		username,
		password,
		remember
	}
})
const signOut = () => ({type: types.AUTH.SIGN_OUT , payload:{}})

const AuthActions = {
	signIn,
	signOut
}

export default AuthActions