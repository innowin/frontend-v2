import translate from "./translate"
import university from 'src/redux/reducers/initialState/common/university'
import educationField from 'src/redux/reducers/initialState/common/educationField'

export default {
  ROOT: state => ({
    ...state,
    common: {
      ...state.common,
      university: university,
      educationField: educationField
    },
    intl: translate(state.intl)
  })
}