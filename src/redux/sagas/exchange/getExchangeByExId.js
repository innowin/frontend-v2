import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"

export function* getExchangeByExId(action) {
	const {id} = action.payload
	const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.GET_EXCHANGE_BY_EX_ID)
	try {
		yield fork(
				api.get,
				urls.EXCHANGE,
				results.EXCHANGE.GET_EXCHANGE_BY_EX_ID,
				`${id}`
		)
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