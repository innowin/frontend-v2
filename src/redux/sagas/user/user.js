import {updateUserByUserId} from './updateUserByUserIdSaga'

import {takeEvery} from "../../../../node_modules/redux-saga/effects";
import types from "../../actions/types";

// update user by user id
function* watchUpdateUserByUserId() {
  yield takeEvery(types.USER.UPDATE_USER_BY_USER_ID, updateUserByUserId)
}

export default{
  watchUpdateUserByUserId,
}