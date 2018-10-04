import {takeEvery} from "redux-saga/effects"
import types from "src/redux/actions/types"
import {getUserBadges, getOrganBadges, getBadges} from "./getBadge"

function* watchGetUserBadges() {
  yield takeEvery(types.COMMON.GET_USER_BADGES, getUserBadges)
}

function* watchGetOrganBadges() {
  yield takeEvery(types.COMMON.GET_ORG_BADGES, getOrganBadges)
}

function* watchGetBadges() {
  yield takeEvery(types.COMMON.GET_BADGES, getBadges)
}


export default [
  watchGetUserBadges(),
  watchGetOrganBadges(),
  watchGetBadges()
]