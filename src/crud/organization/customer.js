import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const updateOrgCustomer = (formValues, customerId, updateStateForView, hideEdit) => {
	let isLoading = false;
	
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "patch",
				url: `${url}/organizations/customers/${customerId}/`,
				result: `updateOrgCustomer-patch/${customerId}`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`updateOrgCustomer-patch/${customerId}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.data.detail) {
			error = res.data.detail;
		}
		updateStateForView(res.data, error, isLoading);
		hideEdit();
	});
};

export const createOrgCustomer = (formValues,  updateStateForView, hideEdit,organizationId) => {
	let isLoading = false;
	formValues.customer_organization = organizationId;
	console.log(TOKEN)
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "post",
				url: `${url}/organizations/customers/`,
				result: `createOrgCustomer-post/`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`createOrgCustomer-post/`, (res) => {
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
				url: `${url}/organizations/customers/?customer_organization=${organizationId}`,
				result: `OrganizationCustomers-get/${organizationId}`,
				token: TOKEN
			}
		);
	});
};

export const deleteOrgCustomer = (customerId, updateStateForView, hideEdit,organizationId) => {
	let isLoading = false;
	console.log(TOKEN)
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "delete",
				url: `${url}/organizations/customers/${customerId}/`,
				result: `deleteOrgCustomer-delete/${customerId}`,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`deleteOrgCustomer-delete/${customerId}`, (res) => {
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
				url: `${url}/organizations/customers/?customer_organization=${organizationId}`,
				result: `OrganizationCustomers-get/${organizationId}`,
				token: TOKEN
			}
		);

	});
};