import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"

export function* deleteExchangeMembership(action) {
	const {id} = action.payload
	console.log(id, 'iiiii')
  const Id = -11
	const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.DELETE_EXCHANGE_MEMBERSHIP)
	try {
		yield fork(api.del, urls.EXCHANGE.DELETE_EXCHANGE_MEMBERSHIP, results.EXCHANGE.DELETE_EXCHANGE_MEMBERSHIP, ``, `${Id}`)
		const data = yield take(socketChannel)
		
		yield put({type: types.SUCCESS.EXCHANGE.GET_EXCHANGE_BY_EX_ID, payload: {data}})
	} catch (err) {
		const {message} = err
		yield put({
			type: types.ERRORS.EXCHANGE.GET_EXCHANGE_BY_EX_ID,
			payload: {message}
		})
	} finally {
		socketChannel.close()
	}
}