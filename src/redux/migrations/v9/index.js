import translate from "./translate"

export default {
  ROOT: state => ({
    ...state,
    common: {
      ...state.common,
    },
    event: {list:{}, isLoading: false},
    eventAssignment: {list:{}, isLoading: false},
    intl: translate(state.intl)
  })
}