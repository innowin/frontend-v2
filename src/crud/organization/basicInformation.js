import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const updateOrganization = (formValues, organizationId, updateStateForView, hideEdit) => {
	let isLoading = false;
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
				{
					method: "patch",
					url: `${url}/organizations/${organizationId}/`,
					result: `updateBasicInformation-patch/${organizationId}`,
					data :formValues,
					token: TOKEN
				}
		);
	};
	
	emitting();
	
	socket.on(`updateBasicInformation-patch/${organizationId}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
		}
		updateStateForView(res.data, error, isLoading);
		hideEdit();
	});
};