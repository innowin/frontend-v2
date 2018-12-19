import temp from './temp'

export default {
  ROOT: state => ({
    ...state,
    temp: temp(state.temp),
  }),
}