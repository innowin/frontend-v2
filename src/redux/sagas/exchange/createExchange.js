import api from "src/consts/api"
import results from "src/consts/resultName"
import types from "src/redux/actions/types"
import urls from "src/consts/URLS"
import {put, take, fork, call} from "redux-saga/effects"

export function* createExchange(action) {
  const {formValues, finished} = action.payload;
	const socketChannel = yield call(api.createSocketChannel, results.EXCHANGE.CREATE_EXCHANGE)
	let data
	try {
		yield fork(
				api.post,
				urls.EXCHANGE,
				results.EXCHANGE.CREATE_EXCHANGE,
				formValues
		)
		data = yield take(socketChannel)
		yield put({type: types.SUCCESS.EXCHANGE.CREATE_EXCHANGE, payload: {data}})
	} catch (err) {
		const {message} = err
		yield put({
			type: types.ERRORS.EXCHANGE.CREATE_EXCHANGE,
			payload: {message}
		})
	} finally {
		finished(data)
		socketChannel.close()
	}
}