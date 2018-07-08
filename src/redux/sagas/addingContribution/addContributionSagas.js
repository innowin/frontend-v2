import {apply, call, fork, put, take, takeEvery} from "redux-saga/effects";
import types from "../../actions/actionTypes";
import {getOrganization} from "../organization/organizationSaga";
import api from "../../../consts/api";
import urls from "../../../consts/URLS";
import results from "../../../consts/resultName";

function* updateRequest(request, result, data, param) {
    yield apply({}, api.patch, [request, result,data,param])
}

function* postRequest(request, result,data, param) {
    yield apply({}, api.post, [request, result,data,param])
}

function* createSkill(action){
    const formValues = action.data
    const socketChannel = yield call(api.createSocketChannel, results.CREATE_Skill)
    try {
        yield fork(postRequest ,urls.CREATE_Skill, results.CREATE_Skill ,formValues )
        const data = yield take(socketChannel)
        yield put({ type: types.SUCCESS.CREATE_SKILL, payload:data })
    } catch (e) {
        const {message} = e
        yield put({type:types.ERRORS.CREATE_SKILL, payload:{type:types.ERRORS.CREATE_SKILL,message}})
    } finally {
        socketChannel.close()
    }
}

export function* createProduct(action) {
    try {
        console.log('this is addingContribution action:', action)
        yield put({ type: types.ADD_CONTRIBUTION ,data: "some fake data." })
    } catch (error) {
        yield put({type: types.ADD_CONTRIBUTION, error})
    }
}


/**********    %% WATCHERS %%    **********/

export function* watchCreateSkill() {
    yield takeEvery(types.CREATE_SKILL, createSkill)
}