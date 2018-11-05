import initialState from "./initialState"
import types from "../actions/types/index"

import slices from './sliceReducers/favorite'

const favorite = (state = initialState.favorite, action) => {
  switch (action.type) {
      /** -------------------------- get education by user id  -------------------------> **/
    case types.SUCCESS.FAVORITE.GET_FAVORITES:
      return slices.getFavorites.success(state, action)
      /** -------------------------- reset  -------------------------> **/
    case types.RESET:
      return initialState.favorite
    default:
      return state
  }
}

export default favorite