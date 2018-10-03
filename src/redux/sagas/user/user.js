import {updateUserByUserId} from './updateUserByUserIdSaga'
import {updateProfileByProfileId} from "./updateProfileByProfileIdSaga"
import {takeEvery} from "../../../../node_modules/redux-saga/effects"
import types from "../../actions/types"

// update user by user id
function* watchUpdateUserByUserId() {
  yield takeEvery(types.USER.UPDATE_USER_BY_USER_ID, updateUserByUserId)
}

// update profile by profile id
function* watchUpdateProfileByProfileId() {
  yield takeEvery(types.USER.UPDATE_PROFILE_BY_PROFILE_ID, updateProfileByProfileId)
}

export default{
  watchUpdateUserByUserId,
  watchUpdateProfileByProfileId,
}