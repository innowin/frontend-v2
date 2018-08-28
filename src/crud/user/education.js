import {ID, TOKEN} from "../../consts/data"
import {REST_REQUEST} from "../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"

export const createEducation = (formValues, handleResult) => {
  formValues.education_user = ID
  socket.emit(REST_REQUEST,
    {
      method: 'post',
      url: `${url}/users/educations/`,
      data: formValues,
      result: `user-education-create/`,
      token: TOKEN
    })

  socket.on(`user-education-create/`, (res) => {
    if (res.detail) {
      return false
    }
    handleResult(res.data)
  })
}

export const updateEducation = (educationId, formValues, hideEdit, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: 'patch',
      url: `${url}/users/educations/${educationId}/`,
      data: formValues,
      result: `user-education-update/${educationId}`,
      token: TOKEN
    })

  const func = (res) => {
    if (res.detail) {
      return false
    }
    handleResult(res.data)
    hideEdit()
    socket.off(`user-education-update/${educationId}`, func)
  }

  socket.on(`user-education-update/${educationId}`, func)
}

export const deleteEducation = (educationId, formValues, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: 'del',
      url: `${url}/users/educations/${educationId}/`,
      data: formValues,
      result: `user-education-del/${educationId}`,
      token: TOKEN
    })

  socket.on(`user-education-del/${educationId}`, (res) => {
    if (res.detail) {
      return false
    }
    handleResult(res.data)
  })
}

export const getUserEducations = (userId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/users/educations/?education_user=${userId}`,
      result: `/users/educations/get${userId}`,
      token: TOKEN,
    }
  )
  const func = (res) => {
    if (res.detail) {
      return false
    }
    handleResult(res.data)
    socket.off(`/users/educations/get${userId}`, func)
  }
  socket.on(`/users/educations/get${userId}`, func)
}