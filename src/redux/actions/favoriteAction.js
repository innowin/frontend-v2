import types from './types'

const getFavorites = () => ({
  type: types.FAVORITE.GET_FAVORITES,
  payload: {}
})

const FavoriteAction = {
  getFavorites,
}

export default FavoriteAction
