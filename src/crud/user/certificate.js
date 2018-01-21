import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const updateCertificate = (formValues, careerId, updateStateForView, hideEdit) => {
	let isLoading = false;

	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "patch",
				url: `${url}/users/certificates/${careerId}/`,
				result: `updateCertificate-patch/${careerId}`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`updateCertificate-patch/${careerId}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
		}
		updateStateForView(res, error, isLoading);
		hideEdit();
	});
};

export const createCertificate = (formValues, careerId, updateStateForView, hideEdit) => {
	let isLoading = false;

	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "post",
				url: `${url}/users/certificates/${careerId}/`,
				result: `createCertificate-post/${careerId}`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`createCertificate-post/${careerId}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
		}
		updateStateForView(res, error, isLoading);
		hideEdit();
	});
};

export const deleteCertificate = (formValues, careerId, updateStateForView, hideEdit) => {
	let isLoading = false;

	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "delete",
				url: `${url}/users/certificates/${careerId}/`,
				result: `deleteCertificate-delete/${careerId}`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`deleteCertificate-delete/${careerId}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
		}
		updateStateForView(res, error, isLoading);
		hideEdit();
	});
};