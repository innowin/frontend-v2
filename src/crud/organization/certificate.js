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

export const createCertificate = (formValues, certId, updateStateForView, hideEdit,organizationId) => {
	let isLoading = false;

	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "post",
				url: `${url}/organizations/certificates/${certId}/`,
				result: `createCertificate-post/${certId}`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`createCertificate-post/${certId}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
			updateStateForView(res, error, isLoading);
			hideEdit();
			return;
		}

		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/organizations/certificates/${organizationId}`,
				result: `OrganizationCertificates-get/${organizationId}`,
				token: "",
			}
		);
	});
};

export const deleteCertificate = (formValues, certId, updateStateForView, hideEdit,organizationId) => {
	let isLoading = false;
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "delete",
				url: `${url}/organizations/certificates/${certId}/`,
				result: `deleteCertificate-delete/${certId}`,
				data :formValues,
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
			hideEdit();
			return;
		}

		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/organizations/certificates/${organizationId}`,
				result: `OrganizationCertificates-get/${organizationId}`,
				token: "",
			}
		);

	});
};