import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const updateCustomer = (formValues, customerId, updateStateForView, hideEdit) => {
	let isLoading = false;
	
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "patch",
				url: `${url}/organizations/customers/${customerId}/`,
				result: `updateCustomer-patch/${customerId}`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`updateCustomer-patch/${customerId}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
		}
		updateStateForView(res, error, isLoading);
		hideEdit();
	});
};



export const createCustomer = (formValues,  updateStateForView, hideEdit,organizationId) => {
	let isLoading = false;
	formValues.customer_organization = organizationId;
	console.log(TOKEN)
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "post",
				url: `${url}/organizations/customers/`,
				result: `createCustomer-post/`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`createCustomer-post/`, (res) => {
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
				url: `${url}/organizations/customers/?customer_organization=${organizationId}`,
				result: `OrganizationCustomers-get/${organizationId}`,
				token: TOKEN
			}
		);
	});
};

export const deleteCustomer = (customerId, updateStateForView, hideEdit,organizationId) => {
	let isLoading = false;
	console.log(TOKEN)
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "delete",
				url: `${url}/organizations/customers/${customerId}/`,
				result: `deleteCustomer-delete/${customerId}`,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`deleteCustomer-delete/${customerId}`, (res) => {
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
				url: `${url}/organizations/customers/?customer_organization=${organizationId}`,
				result: `OrganizationCustomers-get/${organizationId}`,
				token: TOKEN
			}
		);

	});
};