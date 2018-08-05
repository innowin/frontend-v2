import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"

export function* getExchangeByExId(action) {
	const {Id} = action.payload
	const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.GET_EXCHANGE)
	try {
		yield fork(
				api.get,
				urls.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID,
				results.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID,
				`?exchange_id=${Id}`
		)
		const data = yield take(socketChannel)
		yield put({type: types.SUCCESS.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID, payload: {data}})
	} catch (err) {
		const {message} = err
		yield put({
			type: types.ERRORS.EXCHANGE.GET_EXCHANGE_MEMBERS_BY_EX_ID,
			payload: {message}
		})
	} finally {
		socketChannel.close()
	}
}