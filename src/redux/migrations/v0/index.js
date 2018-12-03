import auth from './auth'

export default {
	ROOT: state => ({
    ...state,
    auth: auth(state.auth),
  }),
}