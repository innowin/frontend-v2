import translate from "./translate";

export default {
  ROOT: state => ({
    ...state,
    intl: translate(state.intl)
  }),
}