import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const updateCertificate = (formValues, certId, updateStateForView, hideEdit) => {
	let isLoading = false;

	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "patch",
				url: `${url}/users/certificates/${certId}/`,
				result: `updateCertificate-patch/${certId}`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`updateCertificate-patch/${certId}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
		}
		updateStateForView(res, error, isLoading);
		hideEdit();
	});
};

export const createCertificate = (formValues	, updateStateForView, hideEdit,userId) => {
	let isLoading = false;
	
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "post",
				url: `${url}/users/certificates/`,
				result: `createCertificate-post`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`createCertificate-post`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
			updateStateForView(res, error, isLoading);
			
			return;
		}
		hideEdit();
		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/users/certificates/?certificate_user=${userId}`,
				result: `userCertificates-Certificates-get/${userId}`,
				token: TOKEN
			}
		);
	});
};

export const deleteCertificate = ( certId, updateStateForView, hideEdit, userId) => {
	let isLoading = false;

	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "delete",
				url: `${url}/users/certificates/${certId}/`,
				result: `deleteCertificate-delete/${certId}`,
				data :{},
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`deleteCertificate-delete/${certId}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
			updateStateForView(res, error, isLoading);
			
			return;
		}
		hideEdit();
		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/users/certificates/?certificate_user=${userId}`,
				result: `userCertificates-Certificates-get/${userId}`,
				token: TOKEN
			}
		);
	});
};