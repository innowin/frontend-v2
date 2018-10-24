import {takeEvery} from "redux-saga/effects"
import types from "src/redux/actions/types"
import {getUserBadges, getOrganBadges, getBadges, getAllBadges} from "./getBadge"

function* watchGetUserBadges() {
  yield takeEvery(types.COMMON.GET_USER_BADGES, getUserBadges)
}

function* watchGetOrganBadges() {
  yield takeEvery(types.COMMON.GET_ORG_BADGES, getOrganBadges)
}

function* watchGetBadges() {
  yield takeEvery(types.COMMON.GET_BADGES, getBadges)
}

function* watchGetAllBadges() {
  yield takeEvery(types.COMMON.GET_ALL_BADGES, getAllBadges)
}


export default [
  watchGetUserBadges(),
  watchGetOrganBadges(),
  watchGetBadges(),
  watchGetAllBadges()
]