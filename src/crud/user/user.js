import {REST_REQUEST} from "../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {TOKEN} from "src/consts/data"

// url - resultName - type - action - saga - reducer
export const getUser = (userId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/users/${userId}/`,
      result: `/users/{id}/-get/getUser/${userId}`,
      token: TOKEN,
    }
  )

  const func = (res) => {
    if (res.detail) {
      return false
    }
    handleResult(res.data)
    socket.off(`/users/{id}/-get/getUser/${userId}`, func)
  }
  socket.on(`/users/{id}/-get/getUser/${userId}`, func)
}

// ''  - '' - '' - '' - '' - ''
// by mohammad: url - resultName - type - action - saga - reducer
export const updateUser = (formValues, userId, updateStateForView, hideEdit) => {
    socket.emit(REST_REQUEST, {
      method: "patch",
      url: `${url}/users/${userId}/`,
      result: `updateUser-patch-${userId}`,
      token: TOKEN,
      data: {
        "username": formValues.username,
        "first_name": formValues.first_name,
        "last_name": formValues.last_name,
        "email": formValues.email,
      }
    })
  const func = (res) => {
    if (res.detail) {
      return false
    }
    updateStateForView(res.data)
    hideEdit()
    socket.off(`updateUser-patch-${userId}`, func)
  }
  socket.on(`updateUser-patch-${userId}`, func)
}
