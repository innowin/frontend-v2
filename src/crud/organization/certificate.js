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
		if (res.data.detail) {
			error = res.data.detail;
		}
		updateStateForView(res.data, error, isLoading);
		hideEdit();
	});
};

export const createCertificate = (formValues,  updateStateForView, hideEdit,organizationId) => {
	let isLoading = false;
	formValues.certificate_organization = organizationId;
	console.log(TOKEN)
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "post",
				url: `${url}/organizations/certificates/`,
				result: `createCertificate-post/`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`createCertificate-post/`, (res) => {
		let error = false;
		isLoading = false;
		if (res.data.detail) {
			error = res.data.detail;
			updateStateForView(res, error, isLoading);
			
			return;
		}
		hideEdit();
		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/organizations/certificates/?certificate_organization=${organizationId}`,
				result: `OrganizationCertificates-get/${organizationId}`,
				token: TOKEN
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
		if (res.data.detail) {
			error = res.data.detail;
			updateStateForView(res, error, isLoading);
			
			return;
		}
		hideEdit();
		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/organizations/certificates/?certificate_organization=${organizationId}`,
				result: `OrganizationCertificates-get/${organizationId}`,
				token: TOKEN
			}
		);

	});
};