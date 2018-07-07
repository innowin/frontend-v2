import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const getCareers = (userId, updateCareers, handleErrorLoading) => {

  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/users/work-experiences/?work_experience_user=${userId}`,
      result: `userCareers-Careers-get/${userId}`,
      token: TOKEN
    })

  socket.on(`userCareers-Careers-get/${userId}`, (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail)
      return false
    }
    updateCareers(res, 'get')
    handleErrorLoading()
  })
}


export const createCareer = (formValues, updateCareers, handleErrorLoading, hideCreateForm) => {
  socket.emit(REST_REQUEST,
    {
      method: "post",
      url: `${url}/users/work-experiences/`,
      result: 'createCareer-career',
      data: formValues,//{...formValues, career_user: 6, career_parent: 6},
      token: TOKEN
    }
  )

  socket.on('createCareer-career', (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail)
      return false
    }
    updateCareers(res, 'career')
    handleErrorLoading()
    hideCreateForm()
  })
}

export const updateCareer = (formValues, careerId, updateView, hideEdit, handleErrorLoading) => {
  socket.emit(REST_REQUEST,
    {
      method: "patch",
      url: `${url}/users/work-experiences/${careerId}/`,
      result: `updateCareer-patch/${careerId}`,
      data: formValues,
      token: TOKEN
    }
  )

  socket.on(`updateCareer-patch/${careerId}`, (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail)
      return false
    }
    updateView(res)
    handleErrorLoading()
    hideEdit()
  })
}

export const deleteCareer = (careers, career, updateCareers, hideEdit, handleErrorLoading) => {
  const careerId = career.id
  socket.emit(REST_REQUEST,
    {
      method: "del",
      url: `${url}/users/work-experiences/${careerId}/`,
      result: `deleteCareer-delete/${careerId}`,
      token: TOKEN
    }
  )

  socket.on(`deleteCareer-delete/${careerId}`, (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail)
      return false
    }
    const deletedIndex = careers.indexOf(career)
    updateCareers(null, 'del', deletedIndex)
    handleErrorLoading()
    hideEdit()
  })
}