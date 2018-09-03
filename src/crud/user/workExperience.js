import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const getWorkExperiences = (userId, updateWorkExperiences, handleErrorLoading) => {

  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/users/work-experiences/?work_experience_user=${userId}`,
      result: `userWorkExperiences-WorkExperiences-get/${userId}`,
      token: TOKEN
    })

  socket.on(`userWorkExperiences-WorkExperiences-get/${userId}`, (res) => {
    if (res.data.detail) {
      handleErrorLoading(res.data.detail)
      return false
    }
    updateWorkExperiences(res.data, 'get')
    handleErrorLoading()
  })
}


export const createWorkExperience = (formValues, updateWorkExperiences, handleErrorLoading, hideCreateForm) => {
  socket.emit(REST_REQUEST,
    {
      method: "post",
      url: `${url}/users/work-experiences/`,
      result: 'createWorkExperience-workExperience',
      data: formValues,//{...formValues, workExperience_user: 6, workExperience_parent: 6},
      token: TOKEN
    }
  )

  socket.on('createWorkExperience-workExperience', (res) => {
    if (res.data.detail) {
      handleErrorLoading(res.data.detail)
      return false
    }
    updateWorkExperiences(res.data, 'workExperience')
    handleErrorLoading()
    hideCreateForm()
  })
}

export const updateWorkExperience = (formValues, workExperienceId, updateView, hideEdit, handleErrorLoading) => {
  socket.emit(REST_REQUEST,
    {
      method: "patch",
      url: `${url}/users/work-experiences/${workExperienceId}/`,
      result: `updateWorkExperience-patch/${workExperienceId}`,
      data: formValues,
      token: TOKEN
    }
  )

  socket.on(`updateWorkExperience-patch/${workExperienceId}`, (res) => {
    if (res.data.detail) {
      handleErrorLoading(res.data.detail)
      return false
    }
    updateView(res.data)
    handleErrorLoading()
    hideEdit()
  })
}

export const deleteWorkExperience = (workExperiences, workExperience, updateWorkExperiences, hideEdit, handleErrorLoading) => {
  const workExperienceId = workExperience.id
  socket.emit(REST_REQUEST,
    {
      method: "del",
      url: `${url}/users/work-experiences/${workExperienceId}/`,
      result: `deleteWorkExperience-delete/${workExperienceId}`,
      token: TOKEN
    }
  )

  socket.on(`deleteWorkExperience-delete/${workExperienceId}`, (res) => {
    if (res.data.detail) {
      handleErrorLoading(res.data.detail)
      return false
    }
    const deletedIndex = workExperiences.indexOf(workExperience)
    updateWorkExperiences(null, 'del', deletedIndex)
    handleErrorLoading()
    hideEdit()
  })
}