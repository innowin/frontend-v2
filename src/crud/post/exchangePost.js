import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {REST_REQUEST} from "src/consts/Events"
import {TOKEN as token} from 'src/consts/data'

export const getExchangePosts = (exchangeId, postType, limit = 100, offset = 0, updatePosts, handleErrorLoading) => {
	const url_ = (!postType) ? (`/base/posts/?post_parent=${exchangeId}&limit=${limit}&offset=${offset}`) : (
			`/base/posts/?post_parent=${exchangeId}&post_type=${postType}&limit=${limit}&offset=${offset}`
	);
	socket.emit(REST_REQUEST, {
		method: 'get',
		url: url + url_,
		result: `getExchangePosts-get-${exchangeId}`,
		token,
	});
	const func = (res) => {
		if (res.data.detail) {
			handleErrorLoading(res.data.detail);
			return false;
		}
		updatePosts(res.data.results, 'get');
		handleErrorLoading();
		socket.off(`getExchangePosts-get-${exchangeId}`, func)
	};
	socket.on(`getExchangePosts-get-${exchangeId}`, func);
};


export const getExchangePostsByPostType = (exchangeId, postType, handleResult) => {
	socket.emit(REST_REQUEST, {
		method: 'get',
		url: url + `/base/posts/?post_parent=${exchangeId}&post_type=${postType}`,
		result: `getExchangePostsByPostType-${exchangeId}-${postType}`,
		token
	});
	const func = (res) => {
		if (res.data.detail) {
			return false;
		}
		handleResult(res.data);
		socket.off(`getExchangePostsByPostType-${exchangeId}-${postType}`, func)
	};
	socket.on(`getExchangePostsByPostType-${exchangeId}-${postType}`, func)
};


export const getExchangePostsHasProduct = (exchangeId, handleResult) => {
	//TODO mohsen: &post_related_product!=null
	socket.emit(REST_REQUEST, {
		method: 'get',
		url: url + `/base/posts/?post_parent=${exchangeId}&post_related_product!=null`,
		result: `getExchangePostsHasProduct-${exchangeId}`,
		token
	});
	const func = (res) => {
		if (res.data.detail) {
			return false;
		}
		handleResult(res.data);
		socket.off(`getExchangePostsHasProduct-${exchangeId}`, func)
	};
	socket.on(`getExchangePostsHasProduct-${exchangeId}`, func)
};