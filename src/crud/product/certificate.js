import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN, ID, IDENTITY_ID} from '../../consts/data'

export const updateCertificate = (formValues, certId, updateStateForView, hideEdit) => {
	let isLoading = false;

	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "patch",
				url: `${url}/base/certificates/${certId}/`,
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

export const createCertificate = (formValues,  updateStateForView, hideEdit,productId) => {
	let isLoading = false;
	formValues.certificate_parent = productId;
	formValues.certificate_identity = IDENTITY_ID;
	
	console.log(TOKEN)
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "post",
				url: `${url}/base/certificates/`,
				result: `createCertificate-post/`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`createCertificate-post/`, (res) => { //TODO picture is null problem 
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
				url: `${url}/base/certificates/?certificate_parent=${productId}`,
				result: `ProductCertificates-get/${productId}`,
				token: TOKEN
			}
		);
	});
};

export const deleteCertificate = (certId, updateStateForView, hideEdit,productId) => {
	let isLoading = false;

	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "del",
				url: `${url}/base/certificates/${certId}/`,
				result: `deleteCertificate-delete/${certId}`,
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
				url: `${url}/base/certificates/?certificate_parent=${productId}`,
				result: `ProductCertificates-get/${productId}`,
				token: TOKEN
			}
		);

	});
};