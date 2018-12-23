import translate from "../v3/translate";

export default {
  ROOT: state => ({
    ...state,
    intl: translate(state.intl)
  }),
}