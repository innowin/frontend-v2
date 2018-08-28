import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import client from "src/consts/client"

const token = client.getToken()
//added type - action added -  saga added
export const getExchange = (exchangeId, handleResult) => {
	socket.emit(REST_REQUEST, {
		method: "get",
		url: url + `/exchanges/${exchangeId}/`,
		result: `GET_/exchanges/{id}/${exchangeId}`,
		token
	})
	
	const func = (res) => {
		if (res.detail) {
			return false
		}
		handleResult(res.data)
		socket.off(`GET_/exchanges/{id}/${exchangeId}`, func)
	}
	
	socket.on(`GET_/exchanges/{id}/${exchangeId}`, func)
}
//done!
export const getExchangesByMemberIdentity = (identityOfMember, handleError, handleResult) => {
	// get exchanges that this identity is member of it
	socket.emit(REST_REQUEST, {
		method: "get",
		url: url + `/exchanges/identities/?identity_id=${identityOfMember}`,
		result: "EXCHANGE_LIST_HOME_SIDEBAR",
		token,
	})
	socket.on("EXCHANGE_LIST_HOME_SIDEBAR", res => {
		if (res.detail) {
			handleError(res.detail)
		}
		handleResult(res.data)
	})
}
//added type - should be added to common sagas post
export const getExchangePostComment = (postId) => {
	return new Promise((resolve, reject) => {
		socket.emit(REST_REQUEST, {
			method: "get",
			url: url + `/base/comments/?comment_parent=${postId}`,
			result: `get-exchange-post/${postId}`,
			token,
		})
		socket.on(`get-exchange-post/${postId}`, res => {
			if (res.detail) {
				reject(res.detail)
			}
			socket.off(`get-exchange-post/${postId}`)
			resolve(res.data)
		})
	})
}
//added type - action added - saga added
export const getExchangeMembers = (exchangeId, handleError, handleResult) => {
	socket.emit(REST_REQUEST, {
		method: "get",
		url: url + `/exchanges/identities/?exchange_id=${exchangeId}`,
		result: `get-exchange-members-${exchangeId}`,
		token,
	})
	
	
	const func = (res) => {
		if (res.detail) {
			handleError(res.result)
		}
		handleResult(res.data)
		socket.off(`get-exchange-members-${exchangeId}`, func)
	}
	socket.on(`get-exchange-members-${exchangeId}`, func)
}
//added type - action added - saga added
export const removeExchangeMembership = (id, handleError, handleResult = () => null) => {
	// id is id of /exchanges/identities/{id}/ table not exchangeId or not identityId
	socket.emit(REST_REQUEST, {
		method: "del",
		url: url + `/exchanges/identities/${id}/`,
		result: `removeExchangeMembership-${id}`,
		token,
	})
	
	const func = (res) => {
		if (res.detail) {
			handleError(res.result)
			return false
		}
		handleResult(res.data)
		socket.off(`removeExchangeMembership-${id}`, func)
	}
	socket.on(`removeExchangeMembership-${id}`, func)
}
