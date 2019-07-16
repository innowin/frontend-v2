import {clearCache} from 'src/redux/reducers/initialState'

export default (state) => ({
  ...state,
  ...clearCache,
})