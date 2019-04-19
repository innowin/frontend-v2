import {REST_REQUEST} from "../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {TOKEN as token} from "src/consts/data"

export const getProfile = (userId, handleResult) => {
  socket.emit(REST_REQUEST, {
    method: "get",
    url: `${url}/users/profiles/?profile_user=${userId}`,
    result: `/users/profiles/?profile_user=${userId}`,
    token,
  })

  const func = (res) => {
    if (res.data.detail) {
      return false
    }
    handleResult(res.data[0])
    socket.off(`/users/profiles/?profile_user=${userId}`, func)
  }

  socket.on(`/users/profiles/?profile_user=${userId}`, func)
}