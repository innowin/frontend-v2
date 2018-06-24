import types from './actionTypes';

const signIn = (username, password , remember) => ({
	type: types.SIGN_IN,
	payload: {
		username,
		password,
		remember
	}
})

const AuthActions = {
	signIn,
};
export default AuthActions;