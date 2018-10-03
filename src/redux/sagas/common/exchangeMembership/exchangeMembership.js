import types from "src/redux/actions/types"
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

import {deleteExchangeMembership} from './deleteExchangeMembership'
import {getExchangeMembershipByMemberIdentity} from "./getExchangeMembershipByMemberIdentity";
import {getExchangeMembershipByExchangeId} from './getExchangeMembershipByExchangeId'
import {createExchangeMembership} from "./createExchangeMembership";

/**********    %% WATCHERS %%    **********/

function* watchDeleteExchangeMembership() {
  yield takeEvery(types.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP, deleteExchangeMembership)
}

function* watchGetExchangeMembershipByMemberIdentity() {
  yield takeEvery(types.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY, getExchangeMembershipByMemberIdentity)
}

function* watchGetExchangeMembershipByExchangeId() {
  yield takeEvery(types.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_EXCHANGE_ID, getExchangeMembershipByExchangeId)
}

function* watchCreateExchangeMembership(){
  yield takeEvery(types.COMMON.EXCHANGE_MEMBERSHIP.CREATE_EXCHANGE_MEMBERSHIP, createExchangeMembership)
}

export default [
  watchCreateExchangeMembership(),
  watchDeleteExchangeMembership(),
  watchGetExchangeMembershipByExchangeId(),
  watchGetExchangeMembershipByMemberIdentity(),
]