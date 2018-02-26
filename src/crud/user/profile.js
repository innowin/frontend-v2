import {REST_REQUEST} from "../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {TOKEN} from "src/consts/data"

export const getProfile = (userId, handleResult) => {
  socket.emit(REST_REQUEST, {
    method: "get",
    url: `${url}/users/profiles/?profile_user=${userId}`,
    result: `userProfile-get-${userId}`,
    token: TOKEN,
  });

  socket.on(`userProfile-get-${userId}`, (res) => {
    if (res.detail) {
      return false
    }
    handleResult(res[0]);
  });
};