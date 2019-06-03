import translate from "../v2/translate";

export default {
  ROOT: state => ({
    ...state,
    intl: translate(state.intl)
  }),
}