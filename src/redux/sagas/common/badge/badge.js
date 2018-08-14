import {takeEvery} from "redux-saga/effects"
import types from "src/redux/actions/types"
import {getUserBadges, getOrganBadges} from "./getBadge"

function* watchGetUserBadges() {
  yield takeEvery(types.COMMON.GET_USER_BADGES, getUserBadges)
}

function* watchGetOrganBadges() {
  yield takeEvery(types.COMMON.GET_ORG_BADGES, getOrganBadges)
}

export default {
  watchGetUserBadges,
  watchGetOrganBadges
}