import translate from './translate'

export default {
  ROOT: state => ({
    ...state,
    event: {list: {}, isLoading: false},
    eventAssignment: {list: {}, isLoading: false},
    intl: translate(state.intl),
  }),
}