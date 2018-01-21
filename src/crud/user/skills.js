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
				url: `${url}/users/skills/${skillId}/`,
				result: `updateSkill-patch/${skillId}`,
				data :{
					"content_type" : "json/application",
					"tag":formValues.tag,
					"delete_flag": formValues.delete_flag,
					"description": formValues.description,
					"skill_user": formValues.skill_user,
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