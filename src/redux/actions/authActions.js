import types from './actionTypes'

const signIn = (username, password , remember) => ({
	type: types.SIGN_IN,
	payload: {
		username,
		password,
		remember
	}
})
const signOut = () => ({type: types.SIGN_OUT , payload:{}})

const AuthActions = {
	signIn,
	signOut
}

export default AuthActions;