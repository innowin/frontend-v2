import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const updateSkill = (formValues, skillId, updateStateForView, hideEdit) => {
	let isLoading = false;
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "patch",
				url: `${url}/organizations/abilities/${skillId}/`,
				result: `updateSkill-patch/${skillId}`,
				data :{
					"content_type" : "json/application",
					"delete_flag": formValues.delete_flag,
					"text": formValues.text,
					"ability_organization": formValues.skill_user,
					"title": formValues.title
				},
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`updateSkill-patch/${skillId}`, (res) => {
		let error = false;
		isLoading = false;
		if (res.detail) {
			error = res.detail;
		}
		updateStateForView(res, error, isLoading);
		hideEdit();
	});
};



export const createSkill = (formValues,  updateStateForView, hideEdit,organizationId) => {
	let isLoading = false;
	formValues.ability_organization = organizationId;
	console.log(TOKEN)
	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "post",
				url: `${url}/organizations/abilities/`,
				result: `createSkill-post/`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`createSkill-post/`, (res) => {
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
				url: `${url}/organizations/abilities/?ability_organization=${organizationId}`,
				result: `OrganizationSkills-get/${organizationId}`,
				token: TOKEN
			}
		);
	});
};

export const deleteSkill = (formValues, certId, updateStateForView, hideEdit,organizationId) => {
	let isLoading = false;

	const emitting = () => {
		isLoading = true;
		socket.emit(REST_REQUEST,
			{
				method: "delete",
				url: `${url}/organizations/abilities/${certId}/`,
				result: `deleteSkill-delete/${certId}`,
				data :formValues,
				token: TOKEN
			}
		);
	};

	emitting();

	socket.on(`deleteSkill-delete/${certId}`, (res) => {
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
				url: `${url}/organizations/abilities/?ability_organization=${organizationId}`,
				result: `OrganizationSkills-get/${organizationId}`,
				token: TOKEN
			}
		);

	});
};