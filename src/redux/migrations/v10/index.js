import translate from "../v10/translate";

export default {
  ROOT: state => ({
    ...state,
    intl: translate(state.intl),
  }),
}