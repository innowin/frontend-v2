import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const updateProduct = (formValues, productId, updateStateForView, hideEdit) => {
	let isLoading = false

	const emitting = () => {
		isLoading = true
		socket.emit(REST_REQUEST,
			{
				method: "patch",
				url: `${url}/products/${productId}/`,
				result: `updateProduct-patch/${productId}`,
				data :formValues,
				token: TOKEN
			}
		)
	}

	emitting()

	socket.on(`updateProduct-patch/${productId}`, (res) => {
		let error = false
		isLoading = false
		if (res.detail) {
			error = res.detail
		}
		updateStateForView(res, error, isLoading)
		hideEdit()
	})
}

export const createProduct = (formValues, updateStateForView, hideEdit) => {
	let isLoading = false

	const emitting = () => {
		isLoading = true
		socket.emit(REST_REQUEST,
			{
				method: "post",
				url: `${url}/products/`,
				result: `createProduct-post/`,
				data :formValues,
				token: TOKEN
			}
		)
	}

	emitting()

	socket.on(`createProduct-post/`, (res) => {
		let error = false
		isLoading = false
		if (res.detail) {
			error = res.detail
		}
		updateStateForView(res, error, isLoading)
		hideEdit()
	})
}

export const deleteProduct = (formValues, productId, updateStateForView, hideEdit) => {
	let isLoading = false

	const emitting = () => {
		isLoading = true
		socket.emit(REST_REQUEST,
			{
				method: "delete",
				url: `${url}/organization/products/${productId}/`,
				result: `deleteProduct-delete/${productId}`,
				token: TOKEN
			}
		)
	}

	emitting()

	socket.on(`deleteProduct-delete/${productId}`, (res) => {
		let error = false
		isLoading = false
		if (res.detail) {
			error = res.detail
		}
		updateStateForView(res, error, isLoading)
		hideEdit()
	})
}