import translate from "./translate"

export default {
  ROOT: state => ({
    ...state,
    common: {
      ...state.common,
    },
    intl: translate(state.intl)
  })
}