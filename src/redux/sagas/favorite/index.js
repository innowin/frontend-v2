import types from "src/redux/actions/types"
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

import {getFavorites} from "./getFavorites"

/**********    %% WATCHERS %%    **********/

function* watchGetFavorites()
{
  yield takeEvery(types.FAVORITE.GET_FAVORITES, getFavorites)
}

export default [
  watchGetFavorites(),
]
