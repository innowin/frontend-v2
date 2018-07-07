import {ID, TOKEN} from "../../consts/data"
import {REST_REQUEST} from "../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"

export const createResearch = (researchId, formValues, handleResult) => {
  formValues.education_user = ID
  socket.emit(REST_REQUEST,
    {
      method: 'post',
      url: `${url}/users/researches/${researchId}`,
      data: formValues,
      result: `user-research-create/${researchId}`,
      token: TOKEN
    })

  socket.on(`user-research-create/${researchId}`, (res) => {
    if (res.detail) {
      return false
    }
    handleResult(res)
  })
}

export const updateResearch = (researchId, formValues, hideEdit, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: 'patch',
      url: `${url}/users/researches/${researchId}/`,
      data: formValues,
      result: `user-research-update/${researchId}`,
      token: TOKEN
    })
  const func = (res) => {
    if (res.detail) {
      return false
    }
    handleResult(res)
    hideEdit()
    socket.off(`user-research-update/${researchId}`, func)
  }
  socket.on(`user-research-update/${researchId}`, func)
}

export const deleteResearch = (researchId, formValues, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: 'del',
      url: `${url}/users/researches/${researchId}/`,
      data: formValues,
      result: `user-research-del/${researchId}`,
      token: TOKEN
    })

  socket.on(`user-research-del/${researchId}`, (res) => {
    if (res.detail) {
      return false
    }
    handleResult(res)
  })
}

export const getUserResearches = (userId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/users/researches/?research_user=${userId}`,
      result: "/users/researches/get",
      token: TOKEN,
    }
  )
  const func = (res) => {
    if (res.detail) {
      return false
    }
    handleResult(res)
    socket.off("/users/researches/get", func)
  }
  socket.on("/users/researches/get", func)
}