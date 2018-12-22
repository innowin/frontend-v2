import temp from './temp'
import translate from "../v2/translate";

export default {
  ROOT: state => ({
    ...state,
    temp: temp(state.temp),
    intl: translate(state.intl)
  }),
}