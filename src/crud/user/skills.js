import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const updateSkill = (formValues, skillId, updateStateForView, hideEdit) => {
	let isLoading = false
	const emitting = () => {
		isLoading = true
		socket.emit(REST_REQUEST,
			{
				method: "patch",
				url: `${url}/users/skills/${skillId}/`,
				result: `updateSkill-patch/${skillId}`,
				data :{
					"tag":formValues.tag,
					"description": formValues.description,
					"title": formValues.title
				},
				token: TOKEN
			}
		)
	}

	emitting()

	socket.on(`updateSkill-patch/${skillId}`, (res) => {
		let error = false
		isLoading = false
		if (res.detail) {
			error = res.detail
		}
		updateStateForView(res.data, error, isLoading)
		hideEdit()
	})
}


export const createSkill = (formValues, skills, skill, updateSkills, hideEdit, handleErrorLoading) => {
	let isLoading = false
	const emitting = () => {
		isLoading = true
		socket.emit(REST_REQUEST,
			{
				method: "post",
				url: `${url}/users/skills/`,
				result: `createSkill-post`,
				data :{
					"tag":formValues.tag,
					"delete_flag": formValues.delete_flag,
					"description": formValues.description,
					"skill_user": formValues.skill_user,
					"title": formValues.title
				},
				token: TOKEN
			}
		)
	}

	emitting()

	socket.on(`createSkill-post`, (res) => {
		if (res.detail) {
      handleErrorLoading(res.detail)
      return false
    }
    const deletedIndex = skills.indexOf(skill)
    updateSkills(null, 'del', deletedIndex)
    handleErrorLoading()
    hideEdit()
	})
}


export const deleteSkill = (skill, skills, updateSkills, hideEdit, handleErrorLoading) => {
	let isLoading = false
	const emitting = () => {
		isLoading = true
		socket.emit(REST_REQUEST,
			{
				method: "del",
				url: `${url}/users/skills/${skill.id}/`,
				result: `deleteSkill-delete/${skill.id}/`,
				token: TOKEN
			}
		)
	}

	emitting()

	socket.on(`deleteSkill-delete/${skill.id}/`, (res) => {
		if (res.detail) {
      handleErrorLoading(res.detail)
      return false
    }
    const deletedIndex = skills.indexOf(skill)
    updateSkills(null, 'del', deletedIndex)
    handleErrorLoading()
    hideEdit()
	})
}