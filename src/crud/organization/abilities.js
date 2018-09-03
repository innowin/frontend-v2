import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const updateAbility = (formValues, abilityId, updateStateForView, hideEdit) => {
	let isLoading = false;
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "patch",
				url: `${url}/organizations/abilities/${abilityId}/`,
				result: `updateAbility-patch/${abilityId}`,
				data :{	
					"text": formValues.text,
					"title": formValues.title
				},
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`updateAbility-patch/${abilityId}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.data.detail) {
			error = res.data.detail;
		}
		updateStateForView(res.data, error, isLoading);
		hideEdit();
	});
};

export const createAbility = (formValues,  updateStateForView, hideEdit,organizationId) => {
	let isLoading = false;
	formValues.ability_organization = organizationId;
	console.log(TOKEN)
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "post",
				url: `${url}/organizations/abilities/`,
				result: `createAbility-post/`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`createAbility-post/`, (res) => {
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
				url: `${url}/organizations/abilities/?ability_organization=${organizationId}`,
				result: `OrganizationAbilities-get/${organizationId}`,
				token: TOKEN
			}
		);
	});
};

export const deleteAbility = (formValues, certId, updateStateForView, hideEdit,organizationId) => {
	let isLoading = false;

	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "delete",
				url: `${url}/organizations/abilities/${certId}/`,
				result: `deleteAbility-delete/${certId}`,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`deleteAbility-delete/${certId}`, (res) => {
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
				url: `${url}/organizations/abilities/?ability_organization=${organizationId}`,
				result: `OrganizationAbilities-get/${organizationId}`,
				token: TOKEN
			}
		);

	});
};