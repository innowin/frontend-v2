import auth from './auth'
import translate from './translate'

export default {
	ROOT: state => ({
    ...state,
    auth: auth(state.auth),
    intl: translate(state.intl)
  }),
}