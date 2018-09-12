import types from "src/redux/actions/types"
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/

import {deleteExchangeMembership} from './deleteExchangeMembership'
import {getExchangeMembershipByMemberIdentity} from "./getExchangeMembershipByMemberIdentity";

/**********    %% WATCHERS %%    **********/


function* watchDeleteExchangeMembership() {
  yield takeEvery(types.COMMON.EXCHANGE_MEMBERSHIP.DELETE_EXCHANGE_MEMBERSHIP, deleteExchangeMembership)
}

function* watchGetExchangeMembershipByMemberIdentity() {
  yield takeEvery(types.COMMON.EXCHANGE_MEMBERSHIP.GET_EXCHANGE_MEMBERSHIP_BY_MEMBER_IDENTITY, getExchangeMembershipByMemberIdentity)
}

export default{
  watchDeleteExchangeMembership,
  watchGetExchangeMembershipByMemberIdentity,
}